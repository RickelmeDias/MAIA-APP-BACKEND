import { IsNotEmpty, IsString } from 'class-validator';

export class GetEquipmentsDTO {
  @IsNotEmpty()
  @IsString()
  qrCode: string;
}
