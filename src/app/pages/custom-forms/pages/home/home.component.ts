import { Component, OnInit } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  forms$: Observable<any>
  constructor(private httpClient: NgxDhis2HttpClientService) { }

  ngOnInit(): void {
    this.forms$ = this.httpClient.get('dataSets.json?filter=id:in:[qpcwPcj8D6u]&fields=id,name,dataEntryForm[*]')
  }

}
