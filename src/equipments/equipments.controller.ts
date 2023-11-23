import {
  BadRequestException,
  Body,
  Controller,
  Request,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { EquipmentsService } from './services/equipments.service';
import { GetEquipmentsDTO } from './dto/get-equipments.dto';
import { CreateEquipmentsDTO } from './dto/create-equipments.dto';
import { DeactiveEquipmentsDTO } from './dto/deactive-equipments.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/auth/enum/role.enum';

@Controller('equipment')
export class EquipmentsController {
  constructor(private equipmentsService: EquipmentsService) {}

  @Patch(':qrCode/reserve')
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.User, Role.Admin)
  async reserveEquipment(@Param() params: GetEquipmentsDTO, @Request() req) {
    const reserverdEquipment = await this.equipmentsService.reserveEquipment(
      params.qrCode,
      req.user.id,
    );

    if (!reserverdEquipment) {
      throw new BadRequestException(
        'Equipment already been reserved or not found!',
      );
    }

    return reserverdEquipment;
  }

  @Patch(':qrCode/return')
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.User, Role.Admin)
  async returnEquipment(@Param() params: GetEquipmentsDTO, @Request() req) {
    const returnedEquipment = await this.equipmentsService.returnEquipment(
      params.qrCode,
      req.user.id,
    );

    if (!returnedEquipment) {
      throw new BadRequestException(
        'Equipment already been reserved or not found!',
      );
    }
    return returnedEquipment;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.Admin)
  createEquipment(@Body() equipment: CreateEquipmentsDTO, @Request() req) {
    console.log(req.user.id);
    return this.equipmentsService.create(equipment, req.user.id);
  }

  @Delete(':qrCode')
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.Admin)
  deactiveEquipment(@Param() params: DeactiveEquipmentsDTO, @Request() req) {
    return this.equipmentsService.deactive(params.qrCode, req.user.id);
  }

  @Get(':qrCode')
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.Admin, Role.User)
  async getEquipment(@Param() params: GetEquipmentsDTO, @Request() req) {
    const equipment = await this.equipmentsService.getByQrCode(params.qrCode);
    if (equipment) {
      return {
        ...equipment,
        reservedByUser:
          equipment.reservedByUser == null
            ? null
            : {
                name: equipment.reservedByUser.name,
                ra: equipment.reservedByUser.ra,
              },
      };
    }
    throw new NotFoundException(
      `Equipment with QR Code ${params.qrCode} not found`,
    );
  }
}
