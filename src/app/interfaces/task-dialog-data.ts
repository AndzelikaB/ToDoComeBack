import { Task } from "./task.interface";

type Source = 'add' | 'edit'
export interface TaskDialogData {
  source: Source
  data?: Task
}
