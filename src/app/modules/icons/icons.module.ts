import { NgModule } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  IconBrandGoogle,
  IconCheck,
  IconTrash,
  IconChevronDown,
  IconArrowBackUp,
  IconCalendarUp,
  IconCalendarDown,
  IconCalendarDue,
} from 'angular-tabler-icons/icons';
import { OptionIcons } from 'angular-tabler-icons/lib/options.interfaces';

const icons: OptionIcons = {
  IconBrandGoogle,
  IconCheck,
  IconTrash,
  IconChevronDown,
  IconArrowBackUp,
  IconCalendarUp,
  IconCalendarDown,
  IconCalendarDue,
};

@NgModule({
  declarations: [],
  imports: [
    TablerIconsModule.pick(icons),
  ],
  exports: [
    TablerIconsModule,
  ]
})
export class IconsModule {}
