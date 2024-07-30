import { Component, Output, EventEmitter, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() value: string = '';
  @Input() isStarred: boolean = false;
  @Input() isCompleted: boolean = false;
  @Output() remove = new EventEmitter<void>();
  delete(): void {
    this.remove.emit();
  }

  

  toggleStar(): void {
    this.isStarred = !this.isStarred;
  }

  markAsComplete(): void {
    this.isCompleted = !this.isCompleted;
  }

}
