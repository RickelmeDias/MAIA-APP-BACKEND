import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsEquipmentsEntity } from '../entities/logs-equipments.entity';
import { Between, Like } from 'typeorm';
import { GetLogsEquipmentsFilterDTO } from '../dto/get-logs-equipments-filter.dto';
import { ActionsEnum } from 'src/common/enums/actions.enum';

@Injectable()
export class LogsEquipmentsService {
  constructor(
    @InjectRepository(LogsEquipmentsEntity)
    private logsEquipmentRepository: Repository<LogsEquipmentsEntity>,
  ) {}

  async getAllLogs(filter: GetLogsEquipmentsFilterDTO) {
    return await this.logsEquipmentRepository.findAndCount({
      where: [
        { equipmentName: Like(`%${filter.equipmentName}%`) },
        { actionByUserRa: Like(`%${filter.userRa}%`) },
        {
          createdAt: Between(
            new Date(Number(filter.from)),
            new Date(Number(filter.to)),
          ),
        },
      ],
      order: { createdAt: 'DESC' },
      take: filter.pageSize || 10,
      skip: (filter.page - 1) * filter.pageSize,
    });
  }

  async createLogs(
    action: ActionsEnum,
    userName: string,
    userRa: string,
    equipmentName: string,
  ) {
    const logEntry = new LogsEquipmentsEntity();
    logEntry.action = action;
    logEntry.actionByUserName = userName;
    logEntry.actionByUserRa = userRa;
    logEntry.equipmentName = equipmentName;
    logEntry.createdAt = new Date();

    this.logsEquipmentRepository.save(logEntry);
  }
}
