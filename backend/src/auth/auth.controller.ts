import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('guest')
  guestLogin() {
    return this.authService.guestLogin();
  }

  @Get('me')
  @UseGuards(JwtGuard)
  me(@Req() request: any) {
    return this.authService.getUser(request.user.userId);
  }
}