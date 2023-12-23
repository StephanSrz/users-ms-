import { Injectable } from "@nestjs/common";
import RoomEntity from "./entity/room.entity";
import { RoomRepository } from "./rooms.repository";
import { IRooms } from "src/common/interfaces/rooms.interface";

@Injectable()
export class RoomsService {
  constructor(private readonly roomRepository: RoomRepository){}

  async findRooms(): Promise<IRooms[] | null>{
    let rooms = await this.roomRepository.findRooms();
    if(rooms.length == 0){
      return null
    } 
    return rooms
  }

  async saveRoom(roomEntity: RoomEntity){
    return await this.roomRepository.saveRoom(roomEntity)
  }

  async findRoomById(id){
    return await this.roomRepository.findRoomById(id);
  }

}
