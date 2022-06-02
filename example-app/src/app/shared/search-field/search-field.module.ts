import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFieldComponent } from './search-field.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        SearchFieldComponent
    ],
    exports: [
        SearchFieldComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SearchFieldModule { }
