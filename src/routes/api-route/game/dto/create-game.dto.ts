import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EGameResult } from 'src/helpers/constance/common.enum';

export class CreateGameDto {
  @ApiProperty({ enum: EGameResult })
  @IsNotEmpty()
  @IsEnum(EGameResult)
  gameResult: EGameResult;
}
