export interface IRooms extends Document{
  id: string,
  name: string,
  description: string | null,
  roomCode: string,
  maxNumUsers: number | null,
  createdBy: string
}