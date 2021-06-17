import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingEditorComponent } from './components/drawing-editor/drawing-editor.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DrawingEditorComponent,
    ColorPickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DrawingEditorComponent,
  ],
})
export class DrawingEditorModule { }
