import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageComponent} from './components/page/page.component';
import {ImagePickerComponent} from './components/image-picker/image-picker.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    PageComponent,
    ImagePickerComponent
  ],
  exports: [
    PageComponent,
    ImagePickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UiModule {
}
