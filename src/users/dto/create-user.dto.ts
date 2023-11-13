import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {

    @IsNotEmpty()
    @IsString()
    ra: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    team: string;
}