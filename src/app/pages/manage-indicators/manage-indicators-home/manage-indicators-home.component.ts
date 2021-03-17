import { Component, OnInit } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { find } from 'lodash';

@Component({
  selector: 'app-manage-indicators-home',
  templateUrl: './manage-indicators-home.component.html',
  styleUrls: ['./manage-indicators-home.component.css'],
})
export class ManageIndicatorsHomeComponent implements OnInit {
  indicatorGroups$: Observable<any[]>;

  groupSelected: any;
  selectedGroup: any;
  indicators$: Observable<any[]>;
  selectedIndicators: any[];
  indicatorSelected: any;
  constructor(private httpClientService: NgxDhis2HttpClientService) {}

  ngOnInit(): void {
    this.indicatorGroups$ = this.httpClientService
      .get('indicatorGroups.json?paging=false&fields=id,name,indicators~size')
      .pipe(
        map((response) => {
          return response?.indicatorGroups;
        })
      );
  }

  onSelectIndicatorGroup(indGroup) {
    this.groupSelected = indGroup;
    this.indicators$ = this.httpClientService
      .get('indicatorGroups/' + indGroup?.id + '.json?fields=indicators[*]')
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  onSelectItem(e, indicator) {
    if (e.checked) {
      this.selectedIndicators = [...this.selectedIndicators, indicator];
    } else {
      const removedItem = find(this.selectedIndicators, [
        'id',
        indicator ? indicator.id : undefined,
      ]);

      const itemIndex = this.selectedIndicators.indexOf(removedItem);

      if (itemIndex !== -1) {
        this.selectedIndicators = [
          ...this.selectedIndicators.slice(0, itemIndex),
          ...this.selectedIndicators.slice(itemIndex + 1),
        ];
      }
    }
  }

  onSelectIndicator(indicator) {
    this.indicatorSelected = indicator;
    console.log(this.indicatorSelected);
  }
}
