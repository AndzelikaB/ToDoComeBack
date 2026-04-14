import { Component, inject, Inject, input, Input, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskDialogData } from '../interfaces/task-dialog-data';


type Source = 'add' | 'edit'
@Component({
  selector: 'app-edit-task-dialog',
  imports: [MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormField,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule],
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.scss'
})
export class EditTaskDialogComponent {
  dialogRef = inject(MatDialogRef<EditTaskDialogComponent>)
  taskDialogData = inject<TaskDialogData>(MAT_DIALOG_DATA);

  // formModel = signal({
  //   id: this.taskDialogData.data?.id ?? '',
  //   title: this.taskDialogData.data?.title ?? '',
  //   completed: this.taskDialogData.data?.completed ?? '',
  //   subTasks: (this.taskDialogData.data?.subTasks || []).map(task =>{
  //     id: task.id;
  //     title: task.title;
  //     completed: task.completed;
  //   }),
  // })

  // form = form(this.formModel);

  formi = new FormGroup({
    id: new FormControl(this.taskDialogData.data?.id ?? ''),
    title: new FormControl(this.taskDialogData.data?.title ?? ''),
    completed: new FormControl(this.taskDialogData.data?.completed ?? ''),
    subTasks: new FormArray((this.taskDialogData.data?.subTasks || []).map(task => new FormGroup({
      id: new FormControl(task.id),
      title: new FormControl(task.title),
      completed: new FormControl(task.completed),
    }))),
  })


  source = this.taskDialogData.source


  save() {
    if (this.formi.valid) this.dialogRef.close({ ...this.formi.value, completed: false });
  }

  cancel() {
    this.dialogRef.close();
  }

  addSubtask(title: string) {
    const temporaryId = Date.now();

    const addNew = new FormGroup({
      id: new FormControl(temporaryId),
      title: new FormControl(title),
      completed: new FormControl(false)
    })


    this.subTaskArray.push(new FormGroup({
      id: new FormControl(temporaryId),
      title: new FormControl(title),
      completed: new FormControl(false)
    }))

  }

  get subTaskArray() {
    return this.formi.get('subTasks') as FormArray
  }
}
