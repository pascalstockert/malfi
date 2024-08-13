import { Injectable } from '@angular/core';
import { createEvents as createIcsEvents, DateTime, EventAttributes, ReturnObject } from 'ics';
import { DatePipe } from '@angular/common';
import { Intention, Task } from '../db/db.types';

@Injectable({
  providedIn: 'root'
})
export class IcalService {

  constructor(
    private  datePipe: DatePipe,
  ) { }

  public createEventsFromIntentions(tasksWithIntentions: {intention: Intention, task: Task}[]): ReturnObject {
    const events: EventAttributes[] = tasksWithIntentions.map(taskWithIntention => {
      const startDate = new Date(taskWithIntention.intention.start);
      const endDate = new Date(taskWithIntention.intention.end);

      return {
        start: (this.datePipe.transform(startDate, 'YYYY-MM-d-H-m') as string)
          .split('-')
          .map(a => parseInt(a)) as DateTime,
        end: (this.datePipe.transform(endDate, 'YYYY-MM-d-H-m') as string)
          .split('-')
          .map(a => parseInt(a)) as DateTime,
        title: taskWithIntention.task.title,
        description: taskWithIntention.intention.notes
      };
    })

    return createIcsEvents(events);
  }

  public downloadEvents(eventString: string): void {
    const filename = 'malfi-export.ics';
    const file = new File([eventString], filename, { type: 'text/calendar' });
    const url = URL.createObjectURL(file);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
  }
}
