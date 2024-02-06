import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class RoomDTO{
  @ApiProperty()
  @IsNotEmpty({message: "Name can not be empty"})
  @IsString({message: "Name must be an string"})
  name: string

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({message: "Description can not be empty"})
  @IsString({message: "Description must be an string or null"})
  description: string | null

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({message: "Maximum number of users can not be empty"})
  @IsNumber({}, {message: "Maximum number of users must be a number or null"})
  @Min(1, {message: "Maximum number of users must be at least 1"})
  maxNumUsers: number | null

  @ApiProperty()
  @IsNotEmpty({message: "Craeted by User Id can not be empty"})
  @IsString({message: "Craeted by User Id must be an string"})
  createdBy: string
}