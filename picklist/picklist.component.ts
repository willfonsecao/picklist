import { Component, Input, forwardRef, AfterContentInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PicklistComponent),
  multi: true
};

const noop = () => {};

@Component({
  selector: 'picklist',
  templateUrl: './picklist.component.html',
  styleUrls: ['./picklist.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class PicklistComponent implements AfterContentInit{

  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  
  @Input()
  list1: any[] = [];

  @Input()
  list2: any[] = [];
  
  @Input()
  title1: string;
  
  @Input()
  title2: string;

  @Input()
  displayAttibute: string;

  selected1: Map[] = [];
  selected2: Map[] = [];

  ngAfterContentInit(){
    if(this.list2){
     let indicesInList2 = this.list2.filter(this.comparer(this.list1));
     this.removeFromList1(indicesInList2);
    }
  }

  comparer(otherArray){
    return (current) => {
      return otherArray.filter((other, i) =>{
        if(other.value == current.value && other.display == current.display){
          return i;
        }
      }).length == 0;
    }
  }

  removeFromList1(indices): void{
    this.list1 = this.list1.filter((elemento, i) => indices.indexOf(i) === -1);
  }

  selectList1(target, index) : void{
    if(target.className == ''){
      target.className = 'active';
      this.selected1.push(new Map(index,this.list1[index]));
    }else{
      target.className = '';
      this.selected1.splice(index,1);
      this.selected1 = [...this.selected1];
    }
  }
  
  selectList2(target, index) : void{
    if(target.className == ''){
      target.className = 'active';
      this.selected2.push(new Map(index,this.list2[index]));
    }else{
      target.className = '';
      this.selected2.splice(index,1);
      this.selected2 = [...this.selected2];
    }
  }

  sendToList2() : void{
    let indices: number[] = [];
    for(let i = 0; i < this.selected1.length; i++){
        this.list2.push(this.selected1[i].value);
        indices.push(this.selected1[i].key);
    }
    this.removeFromList1(indices);
    this.selected1 = [];
    this.value = this.list2;
  }

  sendToList1() : void{
    let indices: number[] = [];
    for(let i = 0; i < this.selected2.length; i++){
        this.list1.push(this.selected2[i].value);
        indices.push(this.selected2[i].key);
    }
    this.list2 = this.list2.filter((elemento, i) => indices.indexOf(i) === -1);
    this.selected2 = [];
    this.value = this.list2;
  }

  allToList2() : void{
    for(let i = 0; i < this.list1.length; i++){
        this.list2.push(this.list1[i]);
    }
    this.selected1 = [];
    this.list1 = [];
    this.value = this.list2;
  }
  
  allToList1() : void{
    for(let i = 0; i < this.list2.length; i++){
        this.list1.push(this.list2[i]);
    }
    this.selected2 = [];
    this.list2 = [];
    this.value = null;
  }

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  isDisableList1(): boolean{
    return this.list1 != null && this.list1.length == 0;
  }
  
  isDisableList2(): boolean{
    return this.list2 != null && this.list2.length == 0;
  }

}

class Map{
  key: number;
  value: any;

  constructor(key:number, value:any){
    this.key = key;
    this.value = value;
  }
}
