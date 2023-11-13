import { IsNotEmpty, IsString } from 'class-validator';

export class GetEquipamentsDTO {

    @IsNotEmpty()
    @IsString()
    qrCode: string;

}