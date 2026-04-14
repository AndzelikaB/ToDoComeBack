import { Component, inject } from '@angular/core';
import { ToDoService } from '../services/to-do.service';

@Component({
  selector: 'app-task-stats',
  standalone: true,
  templateUrl: './task-stats.component.html',
  styleUrl: './task-stats.component.scss'
})
export class TaskStatsComponent {
  toDoService = inject(ToDoService)



}
