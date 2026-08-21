import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { UsersService } from './users.service';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    isGuest: boolean;
  };
}

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@Req() req: AuthenticatedRequest) {
    return this.usersService.findByUserId(req.user.userId);
  }

  @Patch('me')
  async updateMe(
    @Req() req: AuthenticatedRequest,
    @Body()
    body: {
      name?: string;
      title?: string;
      username?: string;
      avatar?: string;
    },
  ) {
    return this.usersService.updateProfile(req.user.userId, body);
  }
}