import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ETokenType } from 'src/helpers/constance/common.enum';

export class AuthTokenGenerateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fid: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  companyId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @ApiProperty({ enum: ETokenType })
  @IsNotEmpty()
  @IsEnum(ETokenType)
  type: ETokenType;
}
