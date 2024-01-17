import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  decodeJwt(token: string): any {
    let decoded;
    try {
      decoded = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_KEY'),
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
    return decoded;
  }
}