import { Module } from '@nestjs/common';
import { EquipmentsService } from './services/equipments.service';
import { EquipmentsEntity } from './entities/equipments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentsController } from './equipments.controller';
import { UsersEntity } from 'src/users/entities/users.entity';
import { LogsEquipmentsModule } from 'src/logs-equipments/logs-equipments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EquipmentsEntity]),
    TypeOrmModule.forFeature([UsersEntity]),
    LogsEquipmentsModule,
  ],
  controllers: [EquipmentsController],
  providers: [EquipmentsService],
  exports: [EquipmentsService],
})
export class EquipmentsModule {}
