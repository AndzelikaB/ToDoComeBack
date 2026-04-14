import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { ToDoService } from '../services/to-do.service';

@Component({
    selector: 'app-add-task',
    imports: [],
    templateUrl: './add-task.component.html',
    styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  public dialog = inject(MatDialog)
  readonly toDoService = inject(ToDoService)

  addTask() {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '600px',
      data: {
        source: 'add'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.toDoService.addTask(result);
      }
    })
  }
}
