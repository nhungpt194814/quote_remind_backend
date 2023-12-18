import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

// use to validate input data from user,form,..
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty() // allow display in swagger
    username: string; 
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty() // allow display in swagger
    password: string;
    
    @IsOptional()
    @IsString()
    @ApiProperty() // allow display in swagger
    imgUrl: string;
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty() // allow display in swagger
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty() // allow display in swagger
    phoneNumber: string;
}
