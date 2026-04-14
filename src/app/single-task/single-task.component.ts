import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { SubTask, Task } from '../interfaces/task.interface';
import { filter, map, Observable } from 'rxjs';
import { ToDoService } from '../services/to-do.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

@Component({
    selector: 'app-single-task',
    templateUrl: './single-task.component.html',
    styleUrl: './single-task.component.scss'
})
export class SingleTaskComponent {
  task = input.required<Task>();
  readonly toDoService = inject(ToDoService)
  @Output() updateTaskList = new EventEmitter<number>()
  public dialog = inject(MatDialog)

  saveTaskStatus(task: Task) {
    this.toDoService.updateTaskList(task);
  }

  toggleTask(task: Task) {
    task.completed = !task.completed
    task.subTasks?.forEach(sub => sub.completed = task.completed)
    this.saveTaskStatus(task);
  }

  toggleSubTask(task: Task, subtask: SubTask) {
    subtask.completed = !subtask.completed;
    task.completed = task.subTasks ? task.subTasks.every(sub => sub.completed) : task.completed = false
    this.saveTaskStatus(task);
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '600px',
      data: {
        source: 'edit',
        data: task
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.saveTaskStatus(result);
      }
    })
  }

  deleteTask(task: Task) {
    this.toDoService.deleteTask(task);
  }
}
