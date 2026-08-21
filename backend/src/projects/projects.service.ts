// backend/src/projects/projects.service.ts
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Project,
  ProjectDocument,
} from './schemas/project.schema';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  /**
   * Get all projects visible to the current user.
   *
   * Public projects are visible to everyone.
   * Private projects are visible only to their owner.
   */
  async findAll(userId: string) {
    return this.projectModel
      .find({
        $or: [
          { isPrivate: false },
          { ownerId: userId },
        ],
      })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  /**
   * Get a single project.
   *
   * The user can access:
   * - public projects
   * - their own private projects
   */
  async findOne(id: string, userId: string) {
    const project = await this.projectModel
      .findOne({
        _id: id,
        $or: [
          { isPrivate: false },
          { ownerId: userId },
        ],
      })
      .lean()
      .exec();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  /**
   * Create a project owned by the authenticated user.
   */
  async create(
    createProjectDto: CreateProjectDto,
    userId: string,
  ) {
    const project = await this.projectModel.create({
      ownerId: userId,

      name: createProjectDto.name.trim(),

      // desc: createProjectDto.desc?.trim() ?? '',
      description: createProjectDto.description?.trim() ?? '',

      color: createProjectDto.color ?? '#171717',

      isPrivate: createProjectDto.isPrivate ?? false,
      // private: createProjectDto.private ?? false,

      priority:
        createProjectDto.priority ?? 'no_priority',

      // dueDate: createProjectDto.dueDate ?? '',
    });

    return project;
  }

  /**
   * Update a project.
   *
   * Only the owner can modify it.
   */
  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    userId: string,
  ) {
    const updateData: Record<string, unknown> = {
      ...updateProjectDto,
    };

    if (updateProjectDto.name !== undefined) {
      updateData.name = updateProjectDto.name.trim();
    }
if (
  updateProjectDto.description !== undefined
) {
  updateData.description =
    updateProjectDto.description.trim();
}
    // if (updateProjectDto.desc !== undefined) {
    //   updateData.desc = updateProjectDto.desc.trim();
    // }

    const project = await this.projectModel
      .findOneAndUpdate(
        {
          _id: id,
          ownerId: userId,
        },
        {
          $set: updateData,
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  /**
   * Delete a project.
   *
   * Only the owner can delete it.
   */
  async remove(id: string, userId: string) {
    const project = await this.projectModel
      .findOneAndDelete({
        _id: id,
        ownerId: userId,
      })
      .exec();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return {
      message: 'Project deleted successfully',
      id,
    };
  }
}