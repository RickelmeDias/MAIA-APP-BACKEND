import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { toNumber } from 'src/common/helper/cast.helper';

export class GetLogsEquipmentsFilterDTO {
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber({}, { message: ' "page" atrribute should be a number' })
  public page: number;

  @Transform(({ value }) => toNumber(value, { default: 10, min: 1 }))
  @IsNumber({}, { message: ' "pageSize" attribute should be a number ' })
  public pageSize: number;

  @IsString()
  equipmentName: string;

  @IsNotEmpty()
  from: number;

  @IsNotEmpty()
  to: number;

  @IsString()
  userRa: string;
}
