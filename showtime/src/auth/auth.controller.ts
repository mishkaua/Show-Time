import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  async login(@Body() loginData: { username: string; password: string }) {
    const { username, password } = loginData;
    const token = await this.authService.login(username, password);

    if (!token) {
      return { message: 'invalid credentials' };
    }

    return { token };
  }
}
