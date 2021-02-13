export interface Week {
  id: string;
  weekNumber: number;
  days: Day[];
  goals: Goal[];
}

export interface Day {
  id: string;
  dayNumber: number;
  overview: Progress[];
}

export interface Goal {
  id: string;
  name: string;
  weekNumber?: number;
  tasks: Task[];
}

export interface Task {
  id: string;
  name: string;
  duration: number;
  completed: boolean;
  progress: number;
}

export interface Progress {
  id: string;
  goalId: string;
  taskId: string;
  progress: number;
}
