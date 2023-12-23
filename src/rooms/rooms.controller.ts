import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { RoomDTO } from "./dto/room.dto";
import RoomEntity from "./entity/room.entity";
import { Response } from "express";


@Controller('api/v1/rooms/')
export class RoomsController{
  constructor(private readonly roomsService: RoomsService){}

  @Get()
  async getRooms(@Res() res: Response){
    let rooms = await this.roomsService.findRooms(); 
    if(!rooms){
      return res.status(404).json({message: "There are not rooms"});
    }
    return res.status(200).json(rooms);
  }

  @Post()
  saveRooms(@Body() roomDTO: RoomDTO){
    let roomEntity = new RoomEntity(roomDTO);
    return this.roomsService.saveRoom(roomEntity);
  }

  @Get(':id')
  async getRoomById(@Param('id') id: String, @Res() res: Response){
    let roomResult = await this.roomsService.findRoomById(id);
    if(!roomResult){
      return res.status(404).json({ message: `Room with id ${id} Not found`});
    }
    return res.status(200).json(roomResult);
  }

}
