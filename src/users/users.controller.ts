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
  async getUsers(@Res() res: Response){
    try {
      const users = await this.userService.findAll();
      if(users.length == 0) return { message: "There are not users"}
      return users;
    } catch (error) {
      return { message: 'Error fetching users', error };
    }
  }

  @MessagePattern(UsersMSG.CREATE)
  saveUser(@Payload() userDto: UserDTO){
    try {
      return this.userService.saveUser(userDto);
    } catch(error) {
      return { message: 'Error feching users', error}
    }
  }

  @MessagePattern(UsersMSG.FIND_ONE)
  async getUserById(@Payload() id: string, @Res() res: Response){
    try {
      const user = await this.userService.getUserById(id);
      if(user == null) return { message: "There are not users"}
      return user
    } catch (error) {
      return { message: 'Error feching users', error}
    }
  }

  @MessagePattern(UsersMSG.UPDATE)
  async updateUser(@Payload() payload, @Res() res: Response){
    const userUpdated = await this.userService.updateUser(payload.id, payload.userDTO);
    if (!userUpdated){
      return res.status(404).json({ message: `User with id ${payload.id} Not Found` });
    }
    return res.status(200).json( userUpdated ); 
  }

  @MessagePattern(UsersMSG.DELETE)
  async deleteUser(@Payload() id: string, @Res() res: Response){
    const answer = await this.userService.deleteUser(id);
    if(!answer){
      return res.status(400).json({ message: `User with id: ${id} Not found` });
    }
    return res.status(200).json({ message: "User Deleted" });
  }
}
