import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// use to validate input data from user,form,..
export class UserIdQuery {
    @IsNotEmpty()
    @IsString()
    @ApiProperty() // allow display in swagger
    userId: string;
}