import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserEntity } from './entity/user.entity';
import { UserDTO } from './dto/user.dto';
import { IUsers } from 'src/common/interfaces/users.interfaces';
import * as bcrypt from "bcrypt"


@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository){}

  private async hashPassword(pass: string): Promise<string>{
    const saltRounds = 10;
    try {
      let hash = await bcrypt.hash(pass, saltRounds)
      return hash
    } catch (error) {
      throw new Error("Error generating bcrypt password")  
    }
  }

  async findAll(): Promise<IUsers[] | null> {
    const users = await this.userRepository.findAll();
    if(users.length == 0){
      return null
    }
    return users
  }

  async saveUser(userDto : UserDTO){
    let userEntity: UserEntity = new UserEntity(userDto)
    const newPassword = await this.hashPassword(userEntity.password);
    userEntity.password = newPassword;
    return this.userRepository.saveUser(userEntity);
  }

  async getUserById(id: string): Promise<IUsers | null>{
    const user = await this.userRepository.getUserById(id); 
    if(!user){
      return null;
    }
    return user
  }

  async updateUser(id: string, userDto: UserDTO){
    let userEntity = new UserEntity(userDto)
    const newPassword = await this.hashPassword(userEntity.password);
    userEntity.password = newPassword;
    return this.userRepository.updateUser(id, userEntity);
  }

  deleteUser(id: string){
    return this.userRepository.deleteUser(id);
  }
}
