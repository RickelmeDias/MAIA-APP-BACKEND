import { Module } from '@nestjs/common';
import { LogsEquipmentsService } from './services/logs-equipments.service';
import { LogsEquipmentsEntity } from './entities/logs-equipments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsEquipmentsController } from './logs-equipments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LogsEquipmentsEntity])],
  controllers: [LogsEquipmentsController],
  providers: [LogsEquipmentsService],
  exports: [LogsEquipmentsService],
})
export class LogsEquipmentsModule {}
