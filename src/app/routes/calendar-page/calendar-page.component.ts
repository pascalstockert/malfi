import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PageLayoutComponent } from '../../components/page-layout/page-layout.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { DbService } from '../../services/db/db.service';
import { Intention, TableName, Task } from '../../services/db/db.types';
import { ButtonComponent } from '../../components/button/button.component';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent, NavigationComponent, NgOptimizedImage, CalendarModule, ButtonComponent, TablerIconsModule],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss'
})
export class CalendarPageComponent implements OnInit {
  view = CalendarView.Week;
  viewDate = new Date();
  events: CalendarEvent[] = [];
  eventColors = {
    past: {
      primary: '#FBB0AC',
      secondary: '#FC9893',
    },
    pending: {
      primary: '#adebad',
      secondary: '#a0e7a0',
    },
    completed: {
      primary: '#dddddd',
      secondary: '#c5c5c5',
    },
  }

  constructor(
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

    this.events = this.mergeIntentionsWithTasks(sortedIntentions, taskResponse.data)
      .map(({intention, task}) => {
        let color = this.eventColors.pending;
        const now = new Date();

        if (intention.end < now.toISOString()) {
          color = this.eventColors.past;
        }

        if (intention.completed) {
          color = this.eventColors.completed;
        }

        return {
          title: task.title,
          start: new Date(intention.start),
          end: new Date(intention.end),
          color,
        }
      });
  }

  private mergeIntentionsWithTasks(intentions: Intention[], tasks: Task[]): {intention: Intention, task: Task}[] {
    return intentions.map(intention => ({
      intention,
      task: tasks.find(task => task.id === intention.task) as Task,
    }));
  }
}
