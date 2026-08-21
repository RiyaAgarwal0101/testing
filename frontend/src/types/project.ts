export type ProjectPriority =
  | 'none'
  | 'urgent'
  | 'high'
  | 'medium'
  | 'low';

export interface Project {
  _id: string;
  ownerId?: string;
  name: string;
  description?: string;
  color?: string;
  isPrivate?: boolean;
  priority?: ProjectPriority;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
  color?: string;
  isPrivate?: boolean;
  priority?: ProjectPriority;
  dueDate?: string;
}

export type UpdateProjectPayload =
  Partial<CreateProjectPayload>;

// // frontend/src/types/project.ts

// export type ProjectPriority =
//   | 'no_priority'
//   | 'urgent'
//   | 'high'
//   | 'medium'
//   | 'low';

// export interface ProjectMember {
//   _id: string;
//   name: string;
//   email?: string;
//   avatar?: string | null;
// }

// export interface Project {
//   _id: string;

//   name: string;

//   description?: string;

//   priority?: ProjectPriority;

//   color?: string;

//   members?: ProjectMember[];

//   ownerId?: string;

//   taskCount?: number;

//   completedTaskCount?: number;

//   createdAt?: string;

//   updatedAt?: string;
// }

// export interface CreateProjectPayload {
//   name: string;

//   description?: string;

//   priority?: ProjectPriority;

//   color?: string;

//   memberIds?: string[];
// }

// export interface UpdateProjectPayload {
//   name?: string;

//   description?: string;

//   priority?: ProjectPriority;

//   color?: string;

//   memberIds?: string[];
// }

// export interface ProjectsResponse {
//   projects: Project[];

//   total?: number;
// }