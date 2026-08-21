import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import {
  HydratedDocument,
} from 'mongoose';

export type ProjectDocument =
  HydratedDocument<Project>;

export enum ProjectPriority {
  NONE = 'none',
  URGENT = 'urgent',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

@Schema({
  timestamps: true,
})
export class Project {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    default: '',
    trim: true,
  })
  description: string;

  @Prop({
    required: true,
    index: true,
  })
  ownerId: string;

  @Prop({
    default: '#3b82f6',
  })
  color: string;

  @Prop({
    enum: ProjectPriority,
    default: ProjectPriority.NONE,
  })
  priority: ProjectPriority;

  @Prop()
  dueDate?: Date;

  @Prop({
    default: false,
  })
  isPrivate: boolean;
}

export const ProjectSchema =
  SchemaFactory.createForClass(Project);
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';

// export type ProjectDocument =
//   HydratedDocument<Project>;

// @Schema({
//   timestamps: true,
// })
// export class Project {
//   @Prop({ required: true })
//   name: string;

//   @Prop({ default: '' })
//   description: string;

//   @Prop({ required: true, index: true })
//   ownerId: string;

//   @Prop({ default: '#3b82f6' })
//   color: string;

//   @Prop({
//     enum: [
//       'none',
//       'urgent',
//       'high',
//       'medium',
//       'low',
//     ],
//     default: 'none',
//   })
//   priority: string;

//   @Prop()
//   dueDate?: Date;

//   @Prop({ default: false })
//   isPrivate: boolean;
// }

// export const ProjectSchema =
//   SchemaFactory.createForClass(Project);