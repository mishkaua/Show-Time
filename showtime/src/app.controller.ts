import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
/* import { LocalAuthGuard } from './auth/local-auth.guard'; */
import { AuthService } from './auth/auth.service';
import { Public } from './decorators';
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

 /*  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  } */
  @Public()
  @Get()
  helloWorld() {
    return 'hello world';
  }
  /* @Public()
  @Get('users')
  getUsers(@Request() req){
    return 'req.users';
  } */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
