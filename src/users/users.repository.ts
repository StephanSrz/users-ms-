import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUsers } from 'src/common/interfaces/users.interfaces';
import { UserEntity } from './entity/user.entity';
import { USERS } from 'src/common/models/user.model';

@Injectable()
export class UserRepository {

  constructor(@InjectModel(USERS.name) private readonly userModel: Model<IUsers>){}

  async findAll(): Promise<IUsers[]> {
    return await this.userModel.find();
  }

  async saveUser(userEntity: UserEntity){
    try {
      let newUser = new this.userModel( userEntity );
      return await newUser.save(); 
    } catch(error) {
      return error
    }
  }

  async getUserById(id: string): Promise<IUsers>{
    return await this.userModel.findById(id);
  }

  async updateUser(id: string, userEntity: UserEntity): Promise<IUsers>{
    return await this.userModel.findByIdAndUpdate(id, userEntity, { new: true })
  }

  async deleteUser(id: string): Promise<boolean> | null{
    const userDeleted = await this.userModel.findByIdAndDelete(id);
    if(!userDeleted){
      return null;
    }
    return true;
  }
}