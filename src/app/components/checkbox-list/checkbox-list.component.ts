import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup, NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import { Task } from '../../services/db/db.types';

@Component({
  selector: 'app-checkbox-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './checkbox-list.component.html',
  styleUrl: './checkbox-list.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: CheckboxListComponent,
  }]
})
export class CheckboxListComponent implements ControlValueAccessor, OnInit {
  @Input() enableCheckbox = false;
  @Input() readonly = false;
  @Input() values?: Task[];

  formGroup: FormGroup<{[key: string]: FormControl<string | null>}>;
  controlIndex = 0;
  controlAmount = 0;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({});
    this.addInput();

    this.formGroup.valueChanges.subscribe(values => {
      this.controlAmount = Object.keys(this.formGroup.controls).length;
      const mappedValues = Object.keys(values)
        .map(key => values[key])
        .filter(value => {
          return !!value;
        });
      this.onChange(mappedValues as string[]);

      // Wait for inputs to be rendered
      setTimeout(() => {
        Object.keys(values)
          .forEach(controlName => {
            const elementRef = document.getElementById(controlName);

            if (!elementRef) {
              return;
            }

            elementRef.style.height = elementRef?.scrollHeight + 'px';
          });
      });
    });
  }

  ngOnInit(): void {
    if (this.values) {
      this.writeValue(this.values.map(value => value.title));
    }
  }

  writeValue(values: string[]) {
    if (!values.length) {
      values = [''];
    }

    // @ts-ignore TODO unresolved issue with typed forms
    Object.keys(this.formGroup.controls).forEach(control => this.formGroup.removeControl(control));

    values.forEach(value => {
      this.addInput(value);
    });
  }

  onChange = (values: string[]) => {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  onTouched = () => {}

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.enableCheckbox = false;
  }

  getIndicatorColorClass(task?: Task): string {
    if (task?.completed) {
      return 'completed';
    }

    if (task?.completed === false && task?.has_intention) {
      return 'intended';
    }

    return 'base';
  }

  getNamedControlsAsArray(): { name: string, control: AbstractControl }[] {
    return Object.keys(this.formGroup.controls).map(key => ({
      name: key,
      control: this.formGroup.controls[key],
    }));
  }

  addInput(prefill = '', setFocus = false): string {
    const inputControl = new FormControl<string>(prefill, []);
    const controlName = `input-${this.controlIndex}`;
    this.formGroup.addControl<string>(controlName, inputControl);
    this.controlIndex += 1;

    if (setFocus) {
      this.setFocus(controlName);
    }

    return controlName;
  }

  removeInput(controlName: string): void {
    // @ts-ignore TODO unresolved issue with typed forms
    this.formGroup.removeControl(controlName);
  }

  trackByName(_: number, item: {name: string, control: AbstractControl}) {
    return item.name;
  }

  setFocus(controlName: string): void {
    // wait for the element to be rendered
    window.setTimeout(() => {
      const elementRef = document.getElementById(controlName);
      elementRef?.focus();
    });
  }

  setFocusToPreviousElement(controlName: string): void {
    const inputElementRefs: HTMLInputElement[] = Array.from(document.querySelectorAll('textarea[id*=input-]'));
    const controlIndex = inputElementRefs.findIndex(elementRef => elementRef.id === controlName);
    inputElementRefs.splice(controlIndex, 1);
    const elementRefToFocus = inputElementRefs[Math.max(controlIndex - 1, 0)];
    elementRefToFocus.focus();
    elementRefToFocus.setSelectionRange(-1, -1);
  }

  handleInput(controlName: string, e: KeyboardEvent): void {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (this.formGroup.controls[controlName].value) {
          this.addInput('', true);
        }
        break;
      case 'Backspace':
        if (
          Object.keys(this.formGroup.controls).length > 1 &&
          this.formGroup.controls[controlName].value === ''
        ) {
          e.preventDefault();
          this.setFocusToPreviousElement(controlName);
          this.removeInput(controlName);
        }
        break;
    }
  }

  setTextareaSize(ref: HTMLTextAreaElement): void {
    ref.style.height = '';
    ref.style.height = ref.scrollHeight + 'px';
  }
}
