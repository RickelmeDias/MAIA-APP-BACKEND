import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentsEntity } from 'src/equipments/entities/equipments.entity';
import { LogsEquipmentsEntity } from 'src/logs-equipments/entities/logs-equipments.entity';
import { UsersEntity } from 'src/users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`,
      entities: [UsersEntity, EquipmentsEntity, LogsEquipmentsEntity],
      synchronize: true,
      ssl: process.env.NODE_ENV === 'development' ? false : true,
      extra: {
        ssl: {
          rejectUnauthorized:
            process.env.NODE_ENV === 'development' ? true : false,
        },
      },
    }),
  ],
})
export class DatabaseModule {}
