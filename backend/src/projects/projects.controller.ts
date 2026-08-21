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
import { Request } from 'express';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    isGuest: boolean;
  };
}

@Controller('projects')
@UseGuards(JwtGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    return this.projectsService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return this.projectsService.findOne(id, req.user.userId);
  }

  @Post()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(
      createProjectDto,
      req.user.userId,
    );
  }

  @Patch(':id')
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(
      id,
      updateProjectDto,
      req.user.userId,
    );
  }

  @Delete(':id')
  async remove(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return this.projectsService.remove(id, req.user.userId);
  }
}