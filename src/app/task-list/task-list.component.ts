import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ToDoService } from '../services/to-do.service';
import { SubTask, Task } from '../interfaces/task.interface';
import { SingleTaskComponent } from "../single-task/single-task.component";
import { TaskStatsComponent } from "../task-stats/task-stats.component";
import { AddTaskComponent } from "../add-task/add-task.component";


@Component({
  selector: 'app-task-list',
  imports: [SingleTaskComponent, TaskStatsComponent, AddTaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
  toDoService = inject(ToDoService)
  taskListS = this.toDoService.allTaskList;

  ngOnInit() {
    if (this.taskListS().length === 0) {
      this.toDoService.getTaskList();
    }
  }

  toggleSubTask(task: Task, subtask: SubTask) {
    subtask.completed = !subtask.completed;
    task.completed = task.subTasks!.every(sub => sub.completed)
    this.toDoService.updateTaskList(task);
  }
}
