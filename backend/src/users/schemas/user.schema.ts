import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  userId: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    default: '',
  })
  email: string;

  @Prop({
    default: '',
  })
  title: string;

  @Prop({
    default: '',
  })
  username: string;

  @Prop({
    default: '',
  })
  avatar: string;

  @Prop({
    default: true,
  })
  isGuest: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);