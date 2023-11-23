import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersEntity } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasscryptService } from './services/passcrypt.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService, PasscryptService],
  exports: [UsersService],
})
export class UsersModule {}
