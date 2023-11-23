import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentsEntity } from '../entities/equipments.entity';
import { CreateEquipmentsDTO } from '../dto/create-equipments.dto';
import { UsersEntity } from 'src/users/entities/users.entity';
import { ActionsEnum } from 'src/common/enums/actions.enum';
import { LogsEquipmentsService } from 'src/logs-equipments/services/logs-equipments.service';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(EquipmentsEntity)
    private equipmentsRepository: Repository<EquipmentsEntity>,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    @Inject(LogsEquipmentsService)
    private readonly logsEquipmentsService: LogsEquipmentsService,
  ) {}

  async getByQrCode(qrCode: string): Promise<EquipmentsEntity> {
    const equipment = await this.equipmentsRepository.findOne({
      where: { qrCode: qrCode },
      relations: ['reservedByUser'],
    });

    console.log(equipment);
    if (equipment) {
      return equipment;
    }

    return null;
  }

  async deactive(qrCode: string, userId: number): Promise<EquipmentsEntity> {
    const equipment = await this.equipmentsRepository.findOne({
      where: { qrCode: qrCode },
      relations: ['reservedByUser'],
    });
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    const deactivedEquip = this.equipmentsRepository.save({
      ...equipment,
      isActive: false,
    });

    if (deactivedEquip) {
      this.logsEquipmentsService.createLogs(
        ActionsEnum.DEACTIVATE,
        user.name,
        user.ra,
        equipment.name,
      );

      return deactivedEquip;
    }

    return null;
  }

  async create(
    equipmentDto: CreateEquipmentsDTO,
    userId: number,
  ): Promise<EquipmentsEntity> {
    const equipment: EquipmentsEntity = {
      ...equipmentDto,
      createdAt: new Date(),
    };
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    const createdEquipment = await this.equipmentsRepository.save(equipment);

    if (createdEquipment) {
      this.logsEquipmentsService.createLogs(
        ActionsEnum.CREATE,
        user.name,
        user.ra,
        equipment.name,
      );

      return createdEquipment;
    }
    return null;
  }

  async reserveEquipment(
    qrCode: string,
    userId: number,
  ): Promise<EquipmentsEntity> {
    const equipment = await this.equipmentsRepository.findOne({
      where: { qrCode: qrCode },
      relations: ['reservedByUser'],
    });
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (
      equipment.reservedByUser != null &&
      equipment.reservedByUser.ra == user.ra
    ) {
      return null;
    }

    const updateEquipment = await this.equipmentsRepository.update(
      equipment.id,
      {
        ...equipment,
        reservedByUser: user,
      },
    );

    if (updateEquipment.affected && updateEquipment.affected > 0) {
      const updatedEquipment = await this.equipmentsRepository.findOne({
        where: { id: equipment.id },
        relations: ['reservedByUser'],
      });

      if (updatedEquipment) {
        this.logsEquipmentsService.createLogs(
          ActionsEnum.RESERVE,
          user.name,
          user.ra,
          updatedEquipment.name,
        );

        return updatedEquipment;
      }
    }
    return null;
  }

  async returnEquipment(
    qrCode: string,
    userId: number,
  ): Promise<EquipmentsEntity> {
    const equipment = await this.equipmentsRepository.findOne({
      where: { qrCode: qrCode },
      relations: ['reservedByUser'],
    });
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (
      equipment.reservedByUser == null ||
      equipment.reservedByUser.id != user.id
    ) {
      return null;
    }

    const updateEquipment = await this.equipmentsRepository.save({
      ...equipment,
      reservedByUser: null,
    });

    const returnedEquipment: EquipmentsEntity = updateEquipment;

    if (returnedEquipment) {
      this.logsEquipmentsService.createLogs(
        ActionsEnum.RETURN,
        user.name,
        user.ra,
        equipment.name,
      );

      return returnedEquipment;
    }
    return null;
  }
}
