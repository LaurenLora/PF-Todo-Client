export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterFormType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
};

export enum Priority {
  VERY_LOW = "very_low",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  VERY_HIGH = "very_high"
}

export enum Status {
  TODO = "todo",
  IN_PROGRESS = "progress",
  DONE = "done",
  CANCELED = "canceled"
}

export type CreateTaskType = {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  userId?: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  recommendations: string;
  thumbnail?: string;
  priority?: string;
  files?: string[];
  status?: string;
  userId: string;
};
