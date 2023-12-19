import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  providers: [JwtStrategy, AuthService],
  imports: [ PassportModule, JwtModule.registerAsync({
    useFactory: (config: ConfigService) => {
      return {
        secret: config.get<string>('JWT_KEY'),
        signOptions: {
          expiresIn: '60s',
        },
      };
    },
    inject: [ConfigService],
  }),],
  exports: [AuthService],
})
export class AuthModule {}
