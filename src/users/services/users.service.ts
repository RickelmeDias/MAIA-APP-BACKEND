import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { CreateUserDTO } from '../dto/create-user.dto';
import { Role } from 'src/auth/enum/role.enum';
import { PasscryptService } from './passcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private passcryptService: PasscryptService,
  ) {}

  async create(user: CreateUserDTO): Promise<object> {
    const raExists = await this.userRepository.exist({
      where: { ra: user.ra },
    });

    if (raExists) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: [
            {
              field: 'ra',
              message: 'This ra already exists',
            },
          ],
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const userInstance: UsersEntity = {
      ...user,
      password: await this.passcryptService.crypt(user.password),
      createdAt: new Date(),
      roles: [Role.User],
    };

    await this.userRepository.save(userInstance);
    return { message: 'Account ' + user.ra + ' has been created!' };
  }

  async getUserByRa(ra: string): Promise<UsersEntity> {
    const user: UsersEntity = await this.userRepository.findOne({
      where: { ra: ra },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: [
            {
              field: 'ra',
              message: 'Error find user',
            },
          ],
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return user;
  }
}
