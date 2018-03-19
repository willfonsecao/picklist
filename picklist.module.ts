import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicklistComponent } from './picklist/picklist.component';

@NgModule({
  declarations: [
    PicklistComponent
  ],
  exports: [
    PicklistComponent
  ],
  imports: [
	  CommonModule
  ],
  providers: [
   
  ]
})
export class PickListModule { }