import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { SubTask, Task } from '../interfaces/task.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private readonly apiUrl = 'http://localhost:3000/todos'
  private readonly http = inject(HttpClient)
  // private taskListSubject = new BehaviorSubject<Task[]>([]);
  // public taskList$: Observable<Task[]> = this.taskListSubject.asObservable();


  private taskList = signal<Task[]>([]);
  readonly allTaskList = this.taskList.asReadonly();
  readonly completedTask = computed(() => this.taskList().filter(task => task.completed).length)

  public getTaskList() {
    return this.http.get<Task[]>(this.apiUrl).subscribe(tasks => this.taskList.set(tasks));
  }

  public updateTaskList(updatedTask: Task) {
    return this.http.put<Task>(`${this.apiUrl}/${updatedTask.id}`, updatedTask).subscribe(resp => {
      this.taskList.update((tasks) => tasks.map(task => task.id === resp.id ? resp : task))
    })
  }

  public deleteTask(deletedTask: Task) {
    return this.http.delete<Task>(`${this.apiUrl}/${deletedTask.id}`).subscribe(() => {
      this.taskList.update(tasks => tasks.filter(t => t.id !== deletedTask.id))
    })
  }

  public addTask(newTask: Task) {
    return this.http.post<Task>(`${this.apiUrl}`, newTask).subscribe(resp => {
      this.taskList.update(tasks => [...tasks, resp])
    })
  }
}
