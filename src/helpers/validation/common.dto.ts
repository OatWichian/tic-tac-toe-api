import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { IPaginationReq } from '../interface/common.interface';

export class UuidDto {
  @IsNotEmpty()
  @IsUUID(4)
  uuid: string;
}

export class PaginationDto implements IPaginationReq {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  rowsPerPage: number;
}

export class EmployeeUuidDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  employeeUuid: string;
}
