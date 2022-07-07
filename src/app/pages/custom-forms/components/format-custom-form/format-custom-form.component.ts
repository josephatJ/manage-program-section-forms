import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as _ from "lodash"

@Component({
  selector: 'app-format-custom-form',
  templateUrl: './format-custom-form.component.html',
  styleUrls: ['./format-custom-form.component.css']
})
export class FormatCustomFormComponent implements OnInit {

  @Input() dataSets: any;
  searchString: string = '';
  _htmlMarkup: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  onSelectionChange(item) {
    // let expression = '<input disabled="disabled" id="aI75w49azlp" indicatorformula="(#{o0KObJuu9Yu.o9Oj5Cjekej}+#{o0KObJuu9Yu.ZU3sKDB9i2o})/(1)" name="indicatorFormula" readonly="readonly" style="width:3.5em;text-align:center/" />';
    let ids = [];
    try {
      this._htmlMarkup = this.sanitizer.bypassSecurityTrustHtml(
        item?.dataEntryForm?.htmlCode
      );

      document.addEventListener(
        "click",
        function(event: any) {
          if (
            event.target.name == 'entryfield'
          ) {
            document.getElementById(event.target.id).style.backgroundColor = 'blue';
            ids = [...ids, event.target.id.split("-").join(".").replace(".val", "")];
          } else {
            let expression ='<input disabled="disabled" id="" indicatorformula="('
            _.map(ids, (id,index) => {
              let plusSign = index+1 == ids.length ? '': '+'
              expression += '#{' + id + '}' + plusSign
              //  '(#{o0KObJuu9Yu.o9Oj5Cjekej}+#{o0KObJuu9Yu.ZU3sKDB9i2o})/(1)'
            })
            expression += ')/(1)" name="indicatorFormula" readonly="readonly" style="text-align:center" />';
            console.log(expression);
            document.getElementById('expression').innerText = expression;
            ids = [];
          }
          event.preventDefault();
        },
        false
      );
    } catch (e) {
      console.log("ng on init " + JSON.stringify(e));
    }
  }

}
