import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUsers } from 'src/common/interfaces/users.interfaces';
import { UserEntity } from './entity/user.entity';
import { USERS } from 'src/common/models/user.model';

@Injectable()
export class UserRepository {

  constructor(@InjectModel(USERS.name) private readonly userModel: Model<IUsers>){}

  async findAll(): Promise<IUsers[]> {
    return this.userModel.find();
  }

  async saveUser(userEntity: UserEntity): Promise<IUsers>{
    let newUser = new this.userModel( userEntity )
    return await newUser.save()
  }

  async getUserById(id: string): Promise<IUsers>{
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Error: user with id: ${id} Not Found. Details: ${error.message}`);
    }
  }

  async updateUser(id: string, userEntity: UserEntity): Promise<IUsers>{
    return await this.userModel.findByIdAndUpdate(id, userEntity, { new: true })
  }

  async deleteUser(id: string): Promise<boolean> | null{
    try{
      const userDeleted = await this.userModel.findByIdAndDelete(id);
      if(!userDeleted){
        return null
      }
      return true
    }catch(error){
      throw new NotFoundException(`Error: user with id: ${id} Not Found. Details: ${error.message}`);
    }
  }
}