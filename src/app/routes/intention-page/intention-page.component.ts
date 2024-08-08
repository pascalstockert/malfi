import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { DbService } from '../../services/db/db.service';
import { Intention, TableName, Task } from '../../services/db/db.types';
import { ButtonComponent } from '../../components/button/button.component';
import { IconsModule } from '../../modules/icons/icons.module';
import { CollapsibleComponent } from '../../components/collapsible/collapsible.component';

@Component({
  selector: 'app-intention-page',
  standalone: true,
  imports: [CommonModule, IconsModule, RouterOutlet, PageLayoutComponent, NavigationComponent, NgOptimizedImage, ButtonComponent, CollapsibleComponent],
  templateUrl: './intention-page.component.html',
  styleUrl: './intention-page.component.scss'
})
export class IntentionPageComponent implements OnInit {
  intentionsWithTasks: {intention: Intention, task: Task}[] = [];
  completedIntentionsWithTasks: {intention: Intention, task: Task}[] = [];

  constructor(
    private router: Router,
    private dbService: DbService,
  ) {}

  async ngOnInit(): Promise<void> {
    const intentionResponse = await this.dbService.fetchAll<Intention>(TableName.INTENTIONS);
    if (intentionResponse.error) {
      throw Error(intentionResponse.error.message);
    }

    const taskResponse = await this.dbService.fetchAll<Task>(TableName.TASKS);
    if (taskResponse.error) {
      throw Error(taskResponse.error.message);
    }

    const sortedIntentions = intentionResponse.data.sort((a, b) =>
      a.start < b.start ? -1 : 1
    );

    const intentionsWithTasks = this.mergeIntentionsWithTasks(sortedIntentions, taskResponse.data);
    this.intentionsWithTasks = intentionsWithTasks.filter(intentionWithTask =>
      !intentionWithTask.intention.completed
    );
    this.completedIntentionsWithTasks = intentionsWithTasks.filter(intentionWithTask =>
      intentionWithTask.intention.completed
    );

    console.log(this.intentionsWithTasks);
  }

  public getReadableDateFromString(dateString: string): string {
    const date = new Date(dateString);
    const [day, month, year, hours, minutes] = [
      this.padWithLeadingZero(date.getDay() + 1),
      this.padWithLeadingZero(date.getMonth() + 1),
      date.getFullYear(),
      this.padWithLeadingZero(date.getHours()),
      this.padWithLeadingZero(date.getMinutes()),
    ];

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  public async navigateToCreation(): Promise<void> {
    await this.router.navigate(['/intention/create']);
  }

  private mergeIntentionsWithTasks(intentions: Intention[], tasks: Task[]): {intention: Intention, task: Task}[] {
    return intentions.map(intention => ({
      intention,
      task: tasks.find(task => task.id === intention.task) as Task,
    }));
  }

  private padWithLeadingZero(input: number | string): string {
    return Number(input) < 10 ? `0${input}` : String(input);
  }

  async completeIntention(completedIntentionWithTask: {intention: Intention, task: Task}): Promise<void> {
    await this.dbService.updateById<Intention>(TableName.INTENTIONS, completedIntentionWithTask.intention.id, {completed: true});

    this.intentionsWithTasks = this.intentionsWithTasks.filter(intentionWithTask =>
      !(intentionWithTask.intention.id === completedIntentionWithTask.intention.id)
    );
    this.completedIntentionsWithTasks = [
      ...this.completedIntentionsWithTasks,
      completedIntentionWithTask
    ].sort((a, b) =>
      a.intention.start < b.intention.start ? -1 : 1
    );
  }

  async unCompleteIntention(completedIntentionWithTask: {intention: Intention, task: Task}): Promise<void> {
    await this.dbService.updateById<Intention>(TableName.INTENTIONS, completedIntentionWithTask.intention.id, {completed: false});

    this.completedIntentionsWithTasks = this.completedIntentionsWithTasks.filter(intentionWithTask =>
      !(intentionWithTask.intention.id === completedIntentionWithTask.intention.id)
    );

    this.intentionsWithTasks = [
      ...this.intentionsWithTasks,
      completedIntentionWithTask
    ].sort((a, b) =>
      a.intention.start < b.intention.start ? -1 : 1
    );
  }

  async deleteIntention(intention: Intention): Promise<void> {
    if (confirm('Are you sure you want to delete this intention?')) {
      await this.dbService.deleteById(TableName.INTENTIONS, intention.id);
      await this.dbService.updateById<Task>(TableName.TASKS, intention.task, {has_intention: false});

      this.intentionsWithTasks = this.intentionsWithTasks.filter(intentionWithTask =>
        !(intentionWithTask.intention.id === intention.id)
      );
    }
  }
}
