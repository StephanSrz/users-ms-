import { UserDTO } from "../dto/user.dto"

export class UserEntity{
  name: string
  email: string
  userName: string
  password: string

  constructor(userDto: UserDTO){
    this.name = userDto.name;
    this.email = userDto.email;
    this.userName = userDto.userName;
    this.password = userDto.password;
  }
}

