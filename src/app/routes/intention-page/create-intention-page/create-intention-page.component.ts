import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { CheckboxListComponent } from '../../../components/checkbox-list/checkbox-list.component';
import { PageLayoutComponent } from '../../../components/page-layout/page-layout.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { DbService } from '../../../services/db/db.service';
import { Router } from '@angular/router';
import { Goal, Intention, TableName, Task } from '../../../services/db/db.types';

@Component({
  selector: 'app-create-intention-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CheckboxListComponent, PageLayoutComponent, ReactiveFormsModule],
  templateUrl: './create-intention-page.component.html',
  styleUrl: './create-intention-page.component.scss'
})
export class CreateIntentionPageComponent implements OnInit {
  formGroup: FormGroup;
  isLoading = false;
  goalsWithTasks: {goal: Goal; tasks: Task[]}[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dbService: DbService,
    private router: Router,
  ) {
    this.formGroup = this.formBuilder.group({
      task: new FormControl('', [Validators.required]),
      datetime: new FormControl('', [Validators.required]),
      durationHours: new FormControl(1, [Validators.required]),
      durationMinutes: new FormControl(30, [Validators.required]),
      notes: new FormControl(''),
    });
  }

  async ngOnInit(): Promise<void> {
    const goalsResponse = await this.dbService.fetchAll<Goal>(TableName.GOALS);
    if (goalsResponse.error) {
      throw Error(goalsResponse.error.message);
    }

    this.goalsWithTasks = await Promise.all(
      goalsResponse.data.map(this.populateGoal.bind(this))
    );

    this.formGroup.valueChanges.subscribe(values => {
      const {durationHours, durationMinutes} = values;
      if (durationMinutes > 59) {
        this.formGroup.patchValue({
          durationHours: durationHours + 1,
          durationMinutes: 0,
        });
      }
      if (durationMinutes < 0) {
        this.formGroup.patchValue({
          durationHours: durationHours - 1,
          durationMinutes: 45,
        });
      }
      if (durationHours === 0 && durationMinutes < 0) {
        this.formGroup.patchValue({
          durationHours: 0,
          durationMinutes: 0,
        });
      }
    });
  }

  async populateGoal(goal: Goal): Promise<{goal: Goal, tasks: Task[]}> {
    return new Promise(async (resolve: any, reject: any) => {
      const tasksResponse = await this.dbService.fetchById<Task>(TableName.TASKS, goal.id, 'goal');
      if (tasksResponse.error) {
        return reject(tasksResponse.error.message);
      }

      const tasks = tasksResponse.data
        .filter(task => !task.has_intention)
        .sort((a, b) => a.order < b.order ? -1 : 1);

      resolve({
        goal,
        tasks,
      });
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
    const {task, datetime, durationHours, durationMinutes, notes} = this.formGroup.value;

    const startDate = new Date(datetime);
    let endDate = new Date(datetime);
    endDate = new Date(endDate.setMinutes(endDate.getMinutes() + durationMinutes));
    endDate = new Date(endDate.setHours(endDate.getHours() + durationHours));

    const result = await this.dbService.insertInto<Intention>(TableName.INTENTIONS, {
      task,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      notes,
      user_id: user.id,
      completed: false,
    });

    if (result.error) {
      this.isLoading = false;
      throw Error(result.error.message);
    }

    await this.dbService.updateById<Task>(TableName.TASKS, task, {has_intention: true});

    this.isLoading = false;
    await this.navigateToIntentions();
  }

  async navigateToIntentions(): Promise<boolean> {
    return this.router.navigate(['/intention']);
  }
}
