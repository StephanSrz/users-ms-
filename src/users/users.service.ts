import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository){}

  findAll(){
    return this.userRepository.findAll();
  }

  saveUser(userDto){
    let userEntity: UserEntity = new UserEntity(userDto)
    return this.userRepository.saveUser(userEntity);
  }
}
