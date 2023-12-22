export interface IRooms extends Document{
  id: string,
  name: string,
  description: string,
  code: string,
  cantMaxUsers: number | null,
  createdBy: string
}