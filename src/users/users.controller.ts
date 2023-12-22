import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dto/user.dto';

@Controller('api/v1/users/')
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @Get()
  getUsers(){
    return this.userService.findAll();
  }

  @Post()
  saveUser(@Body() userDto: UserDTO){
    return this.userService.saveUser(userDto);
  }
}
