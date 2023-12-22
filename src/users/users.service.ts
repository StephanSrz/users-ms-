import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { UserEntity } from './entity/user.entity';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository){}

  findAll(){
    return this.userRepository.findAll();
  }

  saveUser(userDto : UserDTO){
    let userEntity: UserEntity = new UserEntity(userDto)
    return this.userRepository.saveUser(userEntity);
  }

  getUserById(id: string){
    return this.userRepository.getUserById(id);
  }

  updateUser(id: string, userDto: UserDTO){
    let userEntity = new UserEntity(userDto)
    return this.userRepository.updateUser(id, userEntity);
  }

  deleteUser(id: string){
    return this.userRepository.deleteUser(id);
  }
}
