import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    if (payload.type === 'login') {
      return {
        userId: payload.sub,
        username: payload.username,
        restaurantId: payload.restaurantId || null,
        type: payload.type,
      };
    } else if (payload.type === 'customer') {
      return { restaurantId: payload.restaurantId, tableNum: payload.tableNum, type: payload.type };
    } else {
      throw new UnauthorizedException('Invalid token type');
    }
  }
}
