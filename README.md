# picklist
this is a full responsive PickList.

# Example

app.ts
```typescript
import { Component } from "@angular/core";

let list1 = [{id: 1, name: "Person1"},{id: 2, name: "Person2"},{id: 3, name: "Person3"},{id: 4, name: "Person4"},
             {id: 5, name: "Person5"},{id: 6, name: "Person6"},{id: 7, name: "Person7"}];

let list2 = [{id: 4, name: "Person4"}];

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent {

selected: any[] = [];
title1: string = 'Title 1';
title2: string = 'Title 2';

}
```
```html
 <div class="col-6">
    <picklist [list1]="list1"
              [title1]="title1" 
              [list2]="list2" 
              [title2]="title2" 
              [displayAttibute]="'name'"
              [(ngModel)]="selected">
    </picklist>
  </div>
```
