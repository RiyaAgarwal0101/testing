import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(JwtGuard)
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  create(
    @Req() req: any,
    @Body() dto: CreateTaskDto,
  ) {
    return this.tasksService.create(
      req.user.userId,
      dto,
    );
  }

  @Get()
  findAll(@Req() req: any) {
    return this.tasksService.findAll(
      req.user.userId,
    );
  }

  @Get(':id')
  findOne(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.tasksService.findOne(
      req.user.userId,
      id,
    );
  }

  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.update(
      req.user.userId,
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.tasksService.remove(
      req.user.userId,
      id,
    );
  }
}