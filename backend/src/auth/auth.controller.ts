import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { Body } from '@nestjs/common';
import { GuestLoginDto } from './dto/guest-login.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  // @Post('guest')
  // guestLogin() {
  //   return this.authService.guestLogin();
  // }
@Post('guest')
guestLogin(
  @Body() dto: GuestLoginDto,
) {
  return this.authService.guestLogin(
    dto.name,
  );
}
  @Get('me')
  @UseGuards(JwtGuard)
  me(@Req() request: any) {
    return this.authService.getUser(request.user.userId);
  }
}