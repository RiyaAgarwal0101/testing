export type TaskStatus =
  | 'todo'
  | 'doing'
  | 'completed'
  | 'onhold';

export type TaskPriority =
  | 'none'
  | 'urgent'
  | 'high'
  | 'medium'
  | 'low';

export interface TaskComment {
  userId: string;
  text: string;
  createdAt: string;
}

export interface TaskSubtask {
  title: string;
  completed: boolean;
}

export interface Task {
  _id: string;

  title: string;

  description?: string;

  status: TaskStatus;

  priority: TaskPriority;

  ownerId: string;

  projectId: string;

  assigneeId: string;

  labels: string[];

  dueDate?: string;

  subtasks: TaskSubtask[];

  comments: TaskComment[];

  createdAt?: string;

  updatedAt?: string;
}
// // frontend/src/types/task.ts

// export type TaskStatus =
//   | 'todo'
//   | 'doing'
//   | 'completed';

// export type TaskPriority =
//   | 'none'
//   | 'urgent'
//   | 'high'
//   | 'medium'
//   | 'low';

// export interface TaskMember {
//   _id: string;
//   name: string;
//   email?: string;
//   avatar?: string | null;
// }

// export interface Task {
//   _id: string;
//   projectId: string;
//   title: string;
//   description?: string;
//   status: TaskStatus;
//   priority?: TaskPriority;
//   dueDate?: string;
//   members?: TaskMember[];
//   labels?: string[];
//   createdAt?: string;
//   updatedAt?: string;
// }
// // export type TaskStatus =
// //   | 'todo'
// //   | 'doing'
// //   | 'completed'
// //   | 'onhold';

// // export type TaskPriority =
// //   | 'none'
// //   | 'urgent'
// //   | 'high'
// //   | 'medium'
// //   | 'low';

// // export interface Task {
// //   _id: string;
// //   title: string;
// //   description: string;
// //   status: TaskStatus;
// //   priority: TaskPriority;
// //   ownerId: string;
// //   projectId: string;
// //   assigneeId: string;
// //   labels: string[];
// //   dueDate?: string;
// //   subtasks: {
// //     title: string;
// //     completed: boolean;
// //   }[];
// //   comments: {
// //     userId: string;
// //     text: string;
// //     createdAt: string;
// //   }[];
// // }