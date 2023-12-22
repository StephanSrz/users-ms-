import { Controller } from "@nestjs/common";
import { RoomsService } from "./rooms.service";


@Controller('api/v1/rooms/')
export class RoomsController{
  constructor(private readonly roomsService: RoomsService){}

}
