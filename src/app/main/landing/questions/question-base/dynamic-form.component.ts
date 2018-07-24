import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'dynamic-form',
    template: `
    <form novalidate (ngSubmit)="onSubmit(form.value)" [formGroup]="form">
      <div *ngFor="let prop of objectProps">
        <label [attr.for]="prop">{{prop.label}}</label>

        <div [ngSwitch]="prop.type">
          <input *ngSwitchCase="'text'" 
            [formControlName]="prop.key"
            [id]="prop.key" [type]="prop.type">
          
          <div *ngSwitchCase="'radio'">
            <label *ngFor="let option of prop.options">
              <input
                type="radio"
                [name]="prop.key"
                [formControlName]="prop.key"
                [value]="option.value"> {{option.label}}
            </label>
          </div>

          <div *ngSwitchCase="'select'">
            <select [formControlName]="prop.key">
              <option *ngFor="let option of prop.options" [value]="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="error" *ngIf="form.get(prop.key).invalid && (form.get(prop.key).dirty || form.get(prop.key).touched)">
            <div *ngIf="form.get(prop.key).errors.required">
              {{ prop.label }} is required.
            </div>
          </div>
      </div>
      <p>
        <button type="submit">Save</button>
      </p>
    </form>
  `,
  styles: [
    `
    .error { color: red; }
    `
  ]
})
export class DynamicFormComponent implements OnInit {
    @Input() dataObject;
    form: FormGroup;
    objectProps;
    constructor() { }

    ngOnInit() {
        this.objectProps =
            Object.keys(this.dataObject)
                .map(prop => {
                    return Object.assign({}, { key: prop }, this.dataObject[prop]);
                });

        // setup the form
        const group = {};
        for(let prop of Object.keys(this.dataObject)) {
            group[prop] = new FormControl(this.dataObject[prop].value || '',
            this.dataObject[prop].validation);
          }
      
          this.form = new FormGroup(group);

    }
}
