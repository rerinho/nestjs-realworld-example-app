import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '~/user/user.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { Bcrypt } from '~/shared/utils/hash';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('jwt.secret'),
          signOptions: {
            expiresIn: configService.get('jwt.expiresIn'),
          },
        };
      },
    }),
  ],
  providers: [AuthService, Bcrypt, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
