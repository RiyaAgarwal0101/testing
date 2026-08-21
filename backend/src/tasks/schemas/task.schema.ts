import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

export enum TaskStatus {
  TODO = 'todo',
  DOING = 'doing',
  COMPLETED = 'completed',
  ON_HOLD = 'onhold',
}

export enum TaskPriority {
  NONE = 'none',
  URGENT = 'urgent',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Prop({
    enum: TaskPriority,
    default: TaskPriority.NONE,
  })
  priority: TaskPriority;

  @Prop({ required: true, index: true })
  ownerId: string;

  @Prop({ default: '' })
  projectId: string;

  @Prop({ default: '' })
  assigneeId: string;

  @Prop({ default: [] })
  labels: string[];

  @Prop({
  type: Date,
  required: false,
})
dueDate?: Date;


  // @Prop()
  // dueDate?: Date;

  @Prop({ default: [] })
  subtasks: {
    title: string;
    completed: boolean;
  }[];

  @Prop({ default: [] })
  comments: {
    userId: string;
    text: string;
    createdAt: Date;
  }[];
}

export const TaskSchema =
  SchemaFactory.createForClass(Task);