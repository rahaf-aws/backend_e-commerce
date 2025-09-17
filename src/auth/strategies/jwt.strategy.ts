/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
  
export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}
  
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
      });
    }
  
    async validate(payload: JwtPayload) {
      const user = await this.usersService.findOne(parseInt(payload.sub));
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    }
}