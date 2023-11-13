import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipamentsEntity } from 'src/equipaments/entities/equipaments.entity';
import { UsersEntity } from 'src/users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`,
      entities: [UsersEntity, EquipamentsEntity],
      synchronize: true,
      ssl: process.env.NODE_ENV === 'development' ? false : true,
      extra: {
        ssl: {
          rejectUnauthorized: process.env.NODE_ENV === 'development' ? true : false
        }
      },
    }),
  ],
})
export class DatabaseModule {}