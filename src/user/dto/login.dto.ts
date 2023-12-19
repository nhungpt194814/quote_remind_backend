import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// use to validate input data from user,form,..
export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty() // allow display in swagger
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty() // allow display in swagger
    password: string;
}
