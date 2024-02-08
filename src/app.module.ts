import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true
    }), 
    MongooseModule.forRoot(process.env.MONGO_URI + process.env.DB_NAME),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
