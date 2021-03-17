import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { each, map, uniq } from 'lodash';

@Component({
  selector: 'app-forms-filter',
  templateUrl: './forms-filter.component.html',
  styleUrls: ['./forms-filter.component.scss'],
})
export class FormsFilterComponent implements OnInit {
  formsControl = new FormControl();
  @Input() forms: any[];
  @Input() formSelected: any;
  @Output() selectedItem: EventEmitter<any[]> = new EventEmitter<any[]>();
  constructor() {}

  ngOnInit(): void {
    this.selectedItem.emit(this.formSelected);
  }

  onSelectForm(event) {
    this.formSelected = event;
    this.selectedItem.emit(event);
  }
}
