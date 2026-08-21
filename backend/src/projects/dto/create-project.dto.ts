import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ProjectPriority } from '../schemas/project.schema';

export class CreateProjectDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsEnum(ProjectPriority)
  priority?: ProjectPriority;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean;
}

// import {
//   IsEnum,
//   IsOptional,
//   IsString,
//   MaxLength,
//   MinLength,
// } from 'class-validator';

// export enum ProjectPriority {
//   NO_PRIORITY = 'no_priority',
//   URGENT = 'urgent',
//   HIGH = 'high',
//   MEDIUM = 'medium',
//   LOW = 'low',
// }

// export class CreateProjectDto {
//   @IsString()
//   @MinLength(1)
//   @MaxLength(100)
//   name: string;

//   @IsOptional()
//   @IsString()
//   @MaxLength(500)
//   description?: string;

//   @IsOptional()
//   @IsEnum(ProjectPriority)
//   priority?: ProjectPriority;

//   @IsOptional()
//   @IsString()
//   color?: string;

//   @IsOptional()
//   memberIds?: string[];
// }


// // import {
// //   IsBoolean,
// //   IsDateString,
// //   IsEnum,
// //   IsHexColor,
// //   IsOptional,
// //   IsString,
// //   MaxLength,
// //   MinLength,
// // } from 'class-validator';

// // export enum ProjectPriority {
// //   NO_PRIORITY = 'no_priority',
// //   URGENT = 'urgent',
// //   HIGH = 'high',
// //   MEDIUM = 'medium',
// //   LOW = 'low',
// // }

// // export class CreateProjectDto {
// //   @IsString()
// //   @MinLength(1)
// //   @MaxLength(100)
// //   name: string;

// //   @IsOptional()
// //   @IsString()
// //   @MaxLength(1000)
// //   desc?: string;

// //   @IsOptional()
// //   @IsHexColor()
// //   color?: string;

// //   @IsOptional()
// //   @IsBoolean()
// //   private?: boolean;

// //   @IsOptional()
// //   @IsEnum(ProjectPriority)
// //   priority?: ProjectPriority;

// //   @IsOptional()
// //   @IsDateString()
// //   dueDate?: string;
// // }