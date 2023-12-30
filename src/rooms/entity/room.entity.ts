import { IRooms } from "src/common/interfaces/rooms.interface"
import { RoomDTO } from "../dto/room.dto"

export default class RoomEntity {
  name: string
  description: string | null
  maxNumUsers: number | null
  createdBy: string
  roomCode: String
  users: string[]

  constructor(roomDTO: RoomDTO){
    this.name = roomDTO.name
    this.description = roomDTO.description ? roomDTO.description : null
    this.maxNumUsers = roomDTO.maxNumUsers ? roomDTO.maxNumUsers : null
    this.createdBy = roomDTO.createdBy
  }

  mapModelToEntity(roomModel: IRooms){
    this.name = roomModel.name
    this.description = roomModel.description
    this.maxNumUsers = roomModel.maxNumUsers
    this.createdBy = roomModel.createdBy
    this.roomCode = roomModel.roomCode
    this.users = roomModel.users
  }
}