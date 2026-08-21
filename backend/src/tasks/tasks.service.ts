import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Task,
  TaskDocument,
} from './schemas/task.schema';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(
    ownerId: string,
    dto: CreateTaskDto,
  ) {
    return this.taskModel.create({
      ...dto,
      ownerId,
      dueDate: dto.dueDate
        ? new Date(dto.dueDate)
        : undefined,
    });
  }

  async findAll(ownerId: string) {
    return this.taskModel
      .find({ ownerId })
      .sort({ createdAt: -1 });
  }

  async findOne(
    ownerId: string,
    id: string,
  ) {
    const task = await this.taskModel.findOne({
      _id: id,
      ownerId,
    });

    if (!task) {
      throw new NotFoundException(
        'Task not found',
      );
    }

    return task;
  }

  async update(
    ownerId: string,
    id: string,
    dto: UpdateTaskDto,
  ) {
    const task =
      await this.taskModel.findOneAndUpdate(
        {
          _id: id,
          ownerId,
        },
        {
          ...dto,
          dueDate: dto.dueDate
            ? new Date(dto.dueDate)
            : undefined,
        },
        {
          new: true,
        },
      );

    if (!task) {
      throw new NotFoundException(
        'Task not found',
      );
    }

    return task;
  }

  async remove(
    ownerId: string,
    id: string,
  ) {
    const task =
      await this.taskModel.findOneAndDelete({
        _id: id,
        ownerId,
      });

    if (!task) {
      throw new NotFoundException(
        'Task not found',
      );
    }

    return {
      success: true,
    };
  }
}