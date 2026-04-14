export interface Task {
  id: number,
  title: string,
  completed: boolean,
  subTasks: SubTask[] | null; // może być null gdy nie ma subtasków
}

export interface SubTask {
  id: number,
  title: string,
  completed: boolean,
}

