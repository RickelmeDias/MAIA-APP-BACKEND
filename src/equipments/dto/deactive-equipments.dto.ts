import { IsNotEmpty, IsString } from 'class-validator';

export class DeactiveEquipmentsDTO {
  @IsNotEmpty()
  @IsString()
  qrCode: string;
}
