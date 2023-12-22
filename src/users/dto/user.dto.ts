import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UserDTO {
  @IsNotEmpty({message: "Name can not be empty"})
  @IsString({message: "Name must be a string"})
  name: string
  
  @IsNotEmpty({message: "Email can not be empty"})
  @IsString({message: "Email must be a string"})
  @IsEmail()
  email: string
  
  @IsNotEmpty({message: "User Name can not be empty"})
  @IsString({message: "User Name must be a string"})
  userName: string
  
  @IsNotEmpty({message: "Password can not be empty"})
  @IsString({message: "Password must be a string"})
  password: string
}