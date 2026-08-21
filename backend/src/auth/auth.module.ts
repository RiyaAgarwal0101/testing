import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';

import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule,

    UsersModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (
        configService: ConfigService,
      ) => ({
        secret:
          configService.get<string>(
            'JWT_SECRET',
          ) || 'development-secret',

        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
  ],

  controllers: [
    AuthController,
  ],

  providers: [
    AuthService,
    JwtGuard,
  ],

  exports: [
    AuthService,
    JwtGuard,
    JwtModule,
  ],
})
export class AuthModule {}

// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { UsersModule } from '../users/users.module';

// @Module({
//   imports: [
//     UsersModule,

//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => ({
//         secret: config.get<string>('JWT_SECRET'),
//         signOptions: {
//           expiresIn: '7d',
//         },
//       }),
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService],
//   exports: [AuthService],
// })
// export class AuthModule {}