import { Body, Controller, Get, Post } from '@nestjs/common';
import { EquipamentsService } from './services/equipaments.service';
import { GetEquipamentsDTO } from './dto/get-equipaments.dto';
import { CreateEquipamentsDTO } from './dto/create-equipaments.dto';

@Controller('user')
export class EquipamentsController {
  constructor(private equipamentsService: EquipamentsService) {}

  @Post()
  createEquipament(@Body() equipament: CreateEquipamentsDTO) {
    return this.equipamentsService.create(equipament);
  }

  @Get()
  getEquipament(@Body() body: GetEquipamentsDTO) {
    return this.equipamentsService.getByQrCode(body.qrCode);
  }


}
