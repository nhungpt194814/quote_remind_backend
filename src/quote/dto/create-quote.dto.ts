import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateQuoteDto {
    @ApiProperty() // allow display in swagger
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty() // allow display in swagger
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty() // allow display in swagger
    @IsNotEmpty()
    @IsString()
    frequency: string;
}
