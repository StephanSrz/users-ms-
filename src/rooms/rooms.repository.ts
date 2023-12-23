import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose';
import RoomEntity from './entity/room.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ROOMS } from 'src/common/models/user.model';
import { IRooms } from 'src/common/interfaces/rooms.interface';

@Injectable()
export class RoomRepository {
  constructor(@InjectModel(ROOMS.name) private roomModel: Model<IRooms>){}

  async findRooms(): Promise<IRooms[]>{
    return await this.roomModel.find();
  }

  async saveRoom(roomEntity: RoomEntity): Promise<IRooms>{
    let newRoom = new this.roomModel(roomEntity);
    return await newRoom.save();
  }

  async findRoomById(id){
    return this.roomModel.findById(id);
  }
}
