import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageComponent} from './components/page/page.component';
import {ImagePickerComponent} from './components/image-picker/image-picker.component';
import {FormsModule} from '@angular/forms';
import {ClipboardWrapperComponent} from './components/clipboard-wrapper/clipboard-wrapper.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClipboardModule,
    MatSnackBarModule,
  ],
  declarations: [
    PageComponent,
    ImagePickerComponent,
    ClipboardWrapperComponent
  ],
  exports: [
    PageComponent,
    ImagePickerComponent,
    ClipboardWrapperComponent,
  ],
})
export class UiModule {
}
