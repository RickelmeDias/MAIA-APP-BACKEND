import { Module } from '@nestjs/common';
import { EquipamentsService } from './services/equipaments.service';
import { EquipamentsEntity } from './entities/equipaments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipamentsController } from './equipaments.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([EquipamentsEntity]),
  ],
  controllers: [EquipamentsController],
  providers: [EquipamentsService],
  exports: [EquipamentsService],
})
export class EquipamentsModule {}