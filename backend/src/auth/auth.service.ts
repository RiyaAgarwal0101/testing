import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async guestLogin(
    name?: string,
  ) {
    const user =
      await this.usersService.createGuest(
        name,
      );

    const token =
      await this.jwtService.signAsync({
        sub: user.userId,
        isGuest: true,
      });

    return {
      accessToken: token,
      user,
    };
  }

  async getUser(userId: string) {
    return this.usersService.findByUserId(
      userId,
    );
  }
}
// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Body } from '@nestjs/common';
// import { GuestLoginDto } from './dto/guest-login.dto';
// import { UsersService } from '../users/users.service';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly usersService: UsersService,
//     private readonly jwtService: JwtService,
//   ) {}

//   // async guestLogin() {
//   //   const user = await this.usersService.createGuest();

//   //   const token = await this.jwtService.signAsync({
//   //     sub: user.userId,
//   //     isGuest: true,
//   //   });

//   //   return {
//   //     accessToken: token,
//   //     user,
//   //   };
//   // }
// async guestLogin(
//   name?: string,
// ) {
//   const user =
//     await this.usersService.createGuest(
//       name,
//     );

//   const token =
//     await this.jwtService.signAsync({
//       sub: user.userId,
//       isGuest: true,
//     });

//   return {
//     accessToken: token,
//     user,
//   };
// }
//   async getUser(userId: string) {
//     return this.usersService.findByUserId(userId);
//   }
// }