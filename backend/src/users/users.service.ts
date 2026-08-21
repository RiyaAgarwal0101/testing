import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  User,
  UserDocument,
} from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createGuest(name?: string) {
    const id = `guest_${crypto.randomUUID()}`;

    return this.userModel.create({
      userId: id,
      name: name?.trim() || 'Guest',
      email: `${id}@guest.local`,
      username: 'guest',
      title: 'Guest',
      avatar: '',
      isGuest: true,
    });
  }

  async findByUserId(userId: string) {
    return this.userModel.findOne({ userId });
  }

  async updateProfile(
    userId: string,
    data: {
      name?: string;
      title?: string;
      username?: string;
      avatar?: string;
    },
  ) {
    return this.userModel.findOneAndUpdate(
      { userId },
      {
        $set: data,
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }
}
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';

// import { User, UserDocument } from './schemas/user.schema';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectModel(User.name)
//     private readonly userModel: Model<UserDocument>,
//   ) {}

//   async createGuest() {
//     const id = `guest_${crypto.randomUUID()}`;

//     return this.userModel.create({
//       userId: id,
//       name: 'Dexter',
//       email: `${id}@guest.local`,
//       username: 'guest',
//       title: 'Guest',
//       avatar: '',
//       isGuest: true,
//     });
//   }

//   async findByUserId(userId: string) {
//     return this.userModel.findOne({ userId });
//   }

//   async updateProfile(userId: string, data: Partial<User>) {
//     return this.userModel.findOneAndUpdate(
//       { userId },
//       data,
//       {
//         new: true,
//       },
//     );
//   }
// }