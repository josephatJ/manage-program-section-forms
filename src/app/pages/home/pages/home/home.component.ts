import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { OrgUnitFilterConfig } from '@iapps/ngx-dhis2-org-unit-filter';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  programs$: Observable<any>;
  orgUnitFilterConfig: OrgUnitFilterConfig;
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  ngOnInit() {
    this.programs$ = this.httpClient.get(
      'programs.json?filter=id:in:[CT0TNl30rld,RwVrL1Y8RTH,Z4szHfJebFL,jYsHdmTJNVh,go4MncVomkQ,R8APevjOH0o,hcFmHC9yXgy]&fields=id,name,programStages[id,name,programStageDataElements[dataElement[id,name]],programStageSections[id,name,description,sortOrder,dataElements[id,name]]],programIndicators[id,name]'
    );
  }
}
