import { RoomDTO } from "../dto/room.dto"

export default class RoomEntity {
  name: string
  description: string | null
  roomCode: String
  maxNumUsers: number | null
  createdBy: string

  constructor(roomDTO: RoomDTO){
    this.name = roomDTO.name
    this.description = roomDTO.description ? roomDTO.description : null 
    this.roomCode = roomDTO.roomCode
    this.maxNumUsers = roomDTO.maxNumUsers ? roomDTO.maxNumUsers : null
    this.createdBy = roomDTO.createdBy
  }
}