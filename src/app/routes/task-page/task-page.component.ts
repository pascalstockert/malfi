import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { Router } from '@angular/router';
import { DbService } from '../../services/db/db.service';
import { Goal, TableName, Task } from '../../services/db/db.types';
import { CheckboxListComponent } from '../../components/checkbox-list/checkbox-list.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { IconsModule } from '../../modules/icons/icons.module';


@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent, NgOptimizedImage, CheckboxListComponent, NavigationComponent, IconsModule],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent implements OnInit {
  isLoading = true;
  goals: {goal: Goal; tasks: Task[]}[] = [];

  constructor(
    private router: Router,
    private dbService: DbService,
  ) {}

  async ngOnInit(): Promise<void> {
    const goalsResponse = await this.dbService.fetchAll<Goal>(TableName.GOALS);
    if (goalsResponse.error) {
      throw Error(goalsResponse.error.message);
    }

    const goals = goalsResponse.data;
    this.goals = await Promise.all(
      goals.map(this.populateGoal.bind(this))
    );

    this.isLoading = false;
  }

  async populateGoal(goal: Goal): Promise<{goal: Goal, tasks: Task[]}> {
    return new Promise(async (resolve: any, reject: any) => {
      const tasksResponse = await this.dbService.fetchById<Task>(TableName.TASKS, goal.id, 'goal');
      if (tasksResponse.error) {
        return reject(tasksResponse.error.message);
      }

      const tasks = tasksResponse.data.sort((a, b) => a.order < b.order ? -1 : 1);
      resolve({
        goal,
        tasks,
      });
    });
  }

  public async deleteGoalWithTasks(goal: Goal): Promise<void> {
    if (confirm('Are you sure you want to delete this goal? All linked subtasks will be deleted as well.')) {
      await this.dbService.deleteById(TableName.GOALS, goal.id);

      this.isLoading = true;
      await this.ngOnInit();
    }
  }

  public async navigateToCreation(): Promise<void> {
    await this.router.navigate(['/task/create']);
  }
}
