import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

  @Get(':id')
  getUserById(@Param('id') id: string){
    return this.userService.getUserById(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userDTO: UserDTO){
    return this.userService.updateUser(id, userDTO);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string){
    return this.userService.deleteUser(id);
  }
}
