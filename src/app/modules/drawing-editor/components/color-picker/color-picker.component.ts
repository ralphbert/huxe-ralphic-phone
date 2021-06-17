import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => ColorPickerComponent),
  }]
})
export class ColorPickerComponent implements OnInit, ControlValueAccessor {
  @Output() colorChange = new EventEmitter<string>();
  @Input() color = 'black';
  colors = ['red', 'green', 'blue', 'yellow', 'orange', 'black'];
  disabled = false;
  onChange: (color: string) => void = (_) => {};
  onTouch: () => void = () => {};

  constructor() { }

  ngOnInit(): void {
  }

  changeColor(color: string): void {
    this.color = color;
    this.colorChange.emit(color);
    this.onTouch();
    this.onChange(color);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(color: any): void {
    this.color = color;
  }
}
