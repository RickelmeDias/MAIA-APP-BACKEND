import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetLogsEquipmentsFilterDTO } from './dto/get-logs-equipments-filter.dto';
import { LogsEquipmentsService } from './services/logs-equipments.service';
import { Role } from 'src/auth/enum/role.enum';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('logs')
export class LogsEquipmentsController {
  constructor(private logsEquipmentsService: LogsEquipmentsService) {}

  @Get('equipment')
  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.Admin)
  getEquipment(@Query() filter: GetLogsEquipmentsFilterDTO) {
    return this.logsEquipmentsService.getAllLogs(filter);
  }
}
