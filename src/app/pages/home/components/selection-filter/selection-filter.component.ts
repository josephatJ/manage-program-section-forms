import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selection-filter',
  templateUrl: './selection-filter.component.html',
  styleUrls: ['./selection-filter.component.css'],
})
export class SelectionFilterComponent implements OnInit {
  searchString: string = '';
  @Output() selectedItem = new EventEmitter<any>();
  @Input() options: any[];
  constructor() {}

  ngOnInit(): void {}

  onSelectionChange(e) {
    this.selectedItem.emit(e);
  }
}
