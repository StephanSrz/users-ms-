import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env'],
      isGlobal: true
    }), 
    MongooseModule.forRoot(process.env.MONGO_URI + process.env.DB_NAME),
    UsersModule,
    RoomsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
