import {ChangeDetectionStrategy, Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => ImagePickerComponent),
  }],
})
export class ImagePickerComponent implements OnInit, ControlValueAccessor {
  images: string[] = Array.from(Array(9).keys()).map(i => `avatar-${i + 1}`);
  value: string = null;
  disabled = false;
  onChanged: (val: string) => void = () => {
  };
  onTouched: () => void = () => {
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  onSelect(image: string): void {
    this.value = image;
    this.onChanged(image);
  }
}
