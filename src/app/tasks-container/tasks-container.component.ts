import { Component, OnInit } from '@angular/core';
import { TaskComponent } from "../task/task.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-container',
  standalone: true,
  imports: [TaskComponent, CommonModule],
  templateUrl: './tasks-container.component.html',
  styleUrl: './tasks-container.component.css'
})
export class TasksContainerComponent implements OnInit {
  components: { value: string, isStarred: boolean, isCompleted: boolean }[] = [];
  ngOnInit(): void {
    this.loadComponents();
  }

  addTask(input: HTMLInputElement): void {
    const value = input.value.trim();  // Get and trim the input value
    if (value) {
      this.components.push({ value, isStarred: false, isCompleted: false });
      this.saveComponents();
      input.value = '';  // Clear the input field
    }
  }

  removeTask(index: number): void {
    this.components.splice(index, 1);
    this.saveComponents();
  }

  saveComponents(): void {
    localStorage.setItem('components', JSON.stringify(this.components));
  }

  loadComponents(): void {
    const savedComponents = localStorage.getItem('components');
    if (savedComponents) {
      this.components = JSON.parse(savedComponents);
    }
  }
  printTasks(): void {
    const printContent = document.getElementById('tasks-container')?.innerHTML || '';
    const printWindow = window.open('', '', 'height=600,width=800');

    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
        <head>
          <title>Print Tasks</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            .task {
              font-size: 18px; /* Larger font size */
              margin-bottom: 15px;
              position: relative;
              padding-left: 30px; /* Space for circle */
            }
            .task:before {
              content: '';
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #ddd; /* Light gray circle */
            }
            .task.completed {
              text-decoration: line-through; /* Line through for completed tasks */
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus(); // Use `focus` directly as it's valid on the `Window` type
      printWindow.print();
    }
}

}
