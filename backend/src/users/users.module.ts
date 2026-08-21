import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import {
  User,
  UserSchema,
} from './schemas/user.schema';

import { JwtGuard } from '../auth/guards/jwt.guard';

@Module({
  imports: [
    ConfigModule,

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
      }),
    }),

    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],

  controllers: [
    UsersController,
  ],

  providers: [
    UsersService,
    JwtGuard,
  ],

  exports: [
    UsersService,
  ],
})
export class UsersModule {}

// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';

// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
// import { User, UserSchema } from './schemas/user.schema';

// @Module({
//   imports: [
//     MongooseModule.forFeature([
//       {
//         name: User.name,
//         schema: UserSchema,
//       },
//     ]),
//   ],
//   providers: [UsersService],
//   controllers: [UsersController],
//   exports: [UsersService],
// })
// export class UsersModule {}