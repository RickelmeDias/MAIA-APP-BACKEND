import { ConfigService } from '@nestjs/config';

const configService: ConfigService = new ConfigService();

export const jwtConstants = {
  secret:  process.env.SECRET_JWT_KEY,
};
