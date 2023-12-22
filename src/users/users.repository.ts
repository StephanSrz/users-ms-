import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUsers } from 'src/common/interfaces/users.interfaces';
import { UserEntity } from './entity/user.entity';
import { USERS } from 'src/common/models/user.model';
import { bcrypt } from "bcrypt"

@Injectable()
export class UserRepository {

  constructor(@InjectModel(USERS.name) private readonly userModel: Model<IUsers>){}

  private async hashPassword(pass: string): Promise<string>{
    const saltRounds = 10;
    try {
      let hash = await bcrypt.hash(pass, saltRounds)
      return hash
    } catch (error) {
      throw new Error("Error generating bcrypt password")  
    }
  }

  async findAll(): Promise<IUsers[]> {
    return this.userModel.find();
  }

  async saveUser(userEntity: UserEntity): Promise<IUsers>{
    const newPassword = this.hashPassword(userEntity.password);
    
    let newUser = new this.userModel(userEntity)
    return await newUser.save()
  }
}