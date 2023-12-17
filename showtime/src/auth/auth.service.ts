import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /* async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === pass) {
      console.log(user);
      const { password, ...result } = user;
      return result;
    }
    return null;
  } */

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      const isPasswordValid = bcrypt.compare(pass, user.password);
      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(username: string, pass: string): Promise<string | null> {
    const user = await this.validateUser(username, pass);
    if (user) {
      const payload = { username: user.username, sub: user.userId };

      try {
        const token = this.jwtService.sign(payload);
        return token;
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  async ValidateToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.usersService.findById(decoded.sub);
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}
