import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dto/user.dto';
import { Response } from 'express';

@Controller('api/v1/users/')
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @Get()
  async getUsers(@Res() res: Response){
    const users = await this.userService.findAll();
    if(!users){
      return res.status(404).json({ message: "There are not users"});
    }
    return res.status(200).json( users );
  }

  @Post()
  saveUser(@Body() userDto: UserDTO){
    return this.userService.saveUser(userDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string, @Res() res: Response){
    const user = await this.userService.getUserById(id);
    if(!user){
      return res.status(404).json({ message: `User with id ${id} Not Found` });
    }
    return res.status(200).json( user );
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userDTO: UserDTO, @Res() res: Response){
    const userUpdated = await this.userService.updateUser(id, userDTO);
    if (!userUpdated){
      return res.status(404).json({ message: `User with id ${id} Not Found` });
    }
    return res.status(200).json( userUpdated ); 
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response){
    const answer = await this.userService.deleteUser(id);
    if(!answer){
      return res.status(400).json({ message: `User with id: ${id} Not found` });
    }
    return res.status(200).json({ message: "User Deleted" });
  }
}
