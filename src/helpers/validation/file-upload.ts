import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';
import { ExceptionMapping } from '../mapping/response.mapping';

export function getFileValidator(maxTotalSize: number = 1 * 1024 * 1024): PipeTransform {
  return new ParseFilePipeDocument(maxTotalSize);
}

export function getFileExcelValidator(maxTotalSize: number = 10 * 1024 * 1024): PipeTransform {
  return new ParseFilePipeDocument(maxTotalSize, ['.xls', '.xlsx']);
}

@Injectable()
export class ParseFilePipeDocument implements PipeTransform {
  private readonly allowedExtensions: string[];

  constructor(
    private readonly maxTotalSize: number,
    allowedExtensions: string[] = ['.png', '.pdf', '.jpeg', '.jpg'],
  ) {
    this.allowedExtensions = allowedExtensions;
  }

  transform(value: Express.Multer.File): Express.Multer.File {
    if (!value?.originalname) return;
    const extension = extname(value?.originalname).toLowerCase();
    if (!this.allowedExtensions.includes(extension))
      throw new BadRequestException(ExceptionMapping.common.typeFileNotSupport);
    if (this.maxTotalSize < value.size) throw new BadRequestException(ExceptionMapping.common.fileLimit);
    return value;
  }
}
