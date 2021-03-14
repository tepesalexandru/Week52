interface Base {
  id?: string;
  userId?: string;
}

export interface Week extends Base {
  weekNumber: number;
  goals: Goal[];
}

export interface Goal extends Base {
  name: string;
  tasks: Task[];
}

export interface Task extends Base {
  name: string;
  estimation: number;
  progressByDay: Progress[];
  dayCompleted: number;
  note: string;
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
  // taskName: string;
  progress: number;
  remaining: number;
  offset?: number;
}