import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorization =
      request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const token = authorization.replace(
      'Bearer ',
      '',
    );

    try {
      const payload =
        await this.jwtService.verifyAsync(token, {
          secret:
            this.configService.get<string>(
              'JWT_SECRET',
            ),
        });

      request.user = {
        userId: payload.sub,
        isGuest: payload.isGuest,
      };

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}