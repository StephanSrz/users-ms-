import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { USERS } from 'src/common/models/user.model';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: USERS.name, 
      useFactory: ()=>{
        return UserSchema
      }
    }])
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository]
})
export class UsersModule {}

