import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// use to validate input data from user,form,..
export class CreateUserDto {
    @ApiProperty() // allow display in swagger
    @IsNotEmpty()
    @IsString()
    username: string; 

    @ApiProperty() // allow display in swagger
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @ApiProperty() // allow display in swagger
    @IsOptional()
    @IsString()
    imgUrl: string;
    
    @ApiProperty() // allow display in swagger
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty() // allow display in swagger
    phoneNumber: string;
}
