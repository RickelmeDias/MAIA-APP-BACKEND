import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEquipamentsDTO {

    @IsNotEmpty()
    @IsString()
    qrCode: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    imgsrc: string;
    
    @IsString()
    description: string;
}