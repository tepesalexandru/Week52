interface Base {
  id?: string;
}

export interface Week extends Base {
  userId: string;
  weekNumber: number;
  goals: Goal[];
}

export interface Goal extends Base {
  userId: string;
  name: string;
  tasks: Task[];
}

export interface Task extends Base {
  name: string;
  estimation: number;
  progressByDay: Progress[];
  dayCompleted: number;
  note: string;
  tags: Tag[]
}

export interface Progress extends Base {
  taskId: string;
  minutes: number;
  day: number;
}

export interface User extends Base {
  name: string;
}

export interface Overview {
  goalName: string;
  task: Task;
  progress: number;
  remaining: number;
  offset?: number;
}

export interface Tag extends Base {
  userId: string;
  name: string;
  color: string;
}