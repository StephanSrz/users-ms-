import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dto/user.dto';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices'; 
import { UsersMSG } from 'src/common/constants/rabbitmq';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @MessagePattern(UsersMSG.FIND_ALL)
  async getUsers(){
    try {
      const users = await this.userService.findAll();
      if(users == null) return { message: "There are not users"}
      return users;
    } catch (error) {
      return { message: 'Error fetching users', error: error.message };
    }
  }

  @MessagePattern(UsersMSG.CREATE)
  saveUser(@Payload() userDto: UserDTO){
    try {
      return this.userService.saveUser(userDto);
    } catch(error) {
      return { message: 'Error feching users', error: error.message };
    }
  }

  @MessagePattern(UsersMSG.FIND_ONE)
  async getUserById(@Payload() id: string){
    try {
      const user = await this.userService.getUserById(id);
      if(user == null) return { message: `User with id ${id} not found`}
      return user
    } catch (error) {
      return { message: 'Error feching users', error };
    }
  }

  @MessagePattern(UsersMSG.UPDATE)
  async updateUser(@Payload() payload){
    try{
      const userUpdated = await this.userService.updateUser(payload.id, payload.userDto);
      if (!userUpdated){
        return { message: `User with id ${payload.id} Not Found` };
      }
      return { "user updated": userUpdated }; 

    } catch(error) {
      return { message: 'Error feching users', error };
    }
  }

  @MessagePattern(UsersMSG.DELETE)
  async deleteUser(@Payload() id: string, @Res() res: Response){
    try{
      const userDeleted: boolean = await this.userService.deleteUser(id);
      if(!userDeleted){
        return { message: `User with id: ${id} Not found` };
      }
      return { message: "User Deleted" };
    } catch(error){
      return { message: 'Error feching users', error };
    }
  }
}
