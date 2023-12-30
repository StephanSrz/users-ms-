import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
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
      return res.status(404).json({ message: `Room with id ${id} Not found` });
    }
    return res.status(200).json(roomResult);
  }

  @Put(':id')
  async updateRoom(@Param('id') id: String, @Body() roomDTO: RoomDTO, @Res() res: Response){
    const roomEntity = new RoomEntity(roomDTO);
    const roomUpdated = await this.roomsService.updateRoom(id, roomEntity);
    if(!roomUpdated){
      return res.status(404).json({ message: `Room with id ${id} Not found` });
    }
    return res.status(202).json(roomUpdated);
  }
  
  @Delete(':id')
  async deleteRoom(@Param('id') id: String, @Res() res: Response){
    const roomDeleted = await this.roomsService.deleteRoom(id);
    if(!roomDeleted){
      return res.status(404).json({ message: `Room with id ${id} Not found` });
    }
    return res.status(200).json({ message: 'Room Deleted' });
  }

  // * User In Room Controller
  @Get(':id/users-room')
  async getUsersInRoom(@Param('id') roomId: string, @Res() res: Response){
    let users = await this.roomsService.findUsersInRoom(roomId);
    if(!users){
      return res.status(202).json({ message: 'There are not users in room'});
    }
    return res.status(202).json( users );
  }

  @Post(':id/add-user')
  async addUserToRoom(@Param('id') roomId: string, @Body('userId') userId: string, @Res() res: Response){
    const userAdded = await this.roomsService.addUserToRoom(roomId, userId);
    if(!userAdded){
      return res.status(404).json({ message: `User with id: ${userId} is already included in room` });
    }
    return res.status(202).json(userAdded);
  }

  @Put(':id/remove-user')
  async removeUserInRoom(@Param('id') roomId: string, @Body('userId') userId: string, @Res() res: Response){
    let userRemoved = await this.roomsService.removeUserInRoom(roomId, userId);
    if(!userRemoved){
      return res.status(404).json({ message: `User with id: ${userId} is not included in room` });
    }
    return res.status(202).json({ message: 'User Removed' });
  }


}
