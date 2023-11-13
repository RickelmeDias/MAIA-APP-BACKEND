import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipamentsEntity } from '../entities/equipaments.entity';
import { CreateEquipamentsDTO } from '../dto/create-equipaments.dto';

@Injectable()
export class EquipamentsService {
  constructor(
    @InjectRepository(EquipamentsEntity)
    private equipamentsRepository: Repository<EquipamentsEntity>,
  ) {}

  async getByQrCode(qrCode: string): Promise<EquipamentsEntity> {
    return this.equipamentsRepository.findOne({
      where: { qrCode: qrCode }
    });
  }

  async create(equipamentDto: CreateEquipamentsDTO): Promise<EquipamentsEntity> {
    const equipament: EquipamentsEntity = {
      ...equipamentDto,
      createdAt: new Date(),
    };
    
    return this.equipamentsRepository.save(equipament);    
  }
}