import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasscryptService } from 'src/users/services/passcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passcryptService: PasscryptService,
    private jwtService: JwtService,
  ) {}

  async validateUser(ra: string, pwd: string): Promise<any> {
    const user = await this.usersService.getUserByRa(ra);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: [
            {
              field: 'password',
              message: 'Auth error.',
            },
          ],
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const validation: boolean = await this.passcryptService.validate(
      pwd,
      user.password,
    );

    if (!validation) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: [
            {
              field: 'password',
              message: 'Auth error.',
            },
          ],
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      ra: user.ra,
      name: user.name,
      team: user.team,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
