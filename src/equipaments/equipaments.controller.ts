import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EquipamentsService } from './services/equipaments.service';
import { GetEquipamentsDTO } from './dto/get-equipaments.dto';
import { CreateEquipamentsDTO } from './dto/create-equipaments.dto';

@Controller('equipament')
export class EquipamentsController {
  constructor(private equipamentsService: EquipamentsService) {}

  @Post()
  createEquipament(@Body() equipament: CreateEquipamentsDTO) {
    return this.equipamentsService.create(equipament);
  }

  @Get(":qrCode")
  getEquipament(@Param() params: GetEquipamentsDTO) {
    return this.equipamentsService.getByQrCode(params.qrCode);
  }


}
