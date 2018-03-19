import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicklistComponent } from './picklist/picklist.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PicklistComponent
  ],
  exports: [
    PicklistComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
   
  ]
})
export class PickListModule { }