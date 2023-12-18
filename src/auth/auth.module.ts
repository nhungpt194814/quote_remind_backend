import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Global()
@Module({
  providers: [JwtStrategy],
  exports: [],
  imports: [ConfigModule, PassportModule],
})
export class AuthModule {}
