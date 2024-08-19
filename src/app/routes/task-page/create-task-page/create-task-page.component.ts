import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../../../components/page-layout/page-layout.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxListComponent } from '../../../components/checkbox-list/checkbox-list.component';
import { DbService } from '../../../services/db/db.service';
import { Goal, InsertData, TableName, Task } from '../../../services/db/db.types';
import { AuthService } from '../../../services/auth/auth.service';
import { ButtonComponent } from '../../../components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task-page',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent, ReactiveFormsModule, CheckboxListComponent, ButtonComponent],
  templateUrl: './create-task-page.component.html',
  styleUrl: './create-task-page.component.scss'
})
export class CreateTaskPageComponent {
  formGroup: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dbService: DbService,
    private router: Router,
  ) {
    this.formGroup = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      deadline: new FormControl(''),
      subtasks: new FormControl([], [Validators.required]),
    });
  }

  async submit(): Promise<void> {
    this.isLoading = true;

    const userResponse = await this.authService.getCurrentUser()
    if (!userResponse.data.user || !userResponse.data.user.id) {
      this.isLoading = false;
      throw Error('cannot find user for current session');
    }

    const {user} = userResponse.data
    const {title, description, deadline, subtasks} = this.formGroup.value;

    const result = await this.dbService.insertInto<Goal>(TableName.GOALS, {
      title,
      description,
      deadline: deadline ? new Date(deadline).toISOString() : undefined,
      user_id: user.id,
    });

    if (result.error) {
      this.isLoading = false;
      throw Error(result.error.message);
    }

    if (subtasks.length) {
      const row = result.data[0];
      const requestMap = subtasks.map(
        (task: string, index: number) => this.dbService.insertInto<InsertData<Task>>(TableName.TASKS, {
          title: task,
          goal: row.id,
          user_id: user.id,
          order: index,
          has_intention: false,
          completed: false,
        })
      );

      await Promise.all(requestMap);
    }

    this.isLoading = false;
    await this.navigateToTasks();
  }

  async navigateToTasks(): Promise<boolean> {
    return this.router.navigate(['/task']);
  }

  get earliestStartDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
