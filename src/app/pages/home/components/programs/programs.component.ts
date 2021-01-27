import { Component, Input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import * as _ from 'lodash';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css'],
})
export class ProgramsComponent implements OnInit {
  @Input() programs: any[];
  selectedProgram: any;
  searchString: string = '';
  programStageSections: any[];
  currentProgramStageSection: any;
  selectedDataElements: any[];
  allDataElements: any[];
  formattedListOfDataElements: any[];
  currentItem: any;
  saving: boolean = false;
  currentProgramStage: any;

  selectedTab = new FormControl(0);
  name: string;
  description: string;
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  ngOnInit(): void {}

  changeTab(e, val) {
    e.stopPropagation();
    this.selectedTab.setValue(val);
  }

  onSelectProgram(program, type?) {
    this.selectedProgram = program;
    this.allDataElements = _.map(
      program?.programStages[0]?.programStageDataElements,
      (programStageDataElement) => {
        return {
          id: programStageDataElement?.dataElement?.id,
          name: programStageDataElement?.dataElement?.name,
        };
      }
    );
  }

  onSaveProgramSection(e) {
    e.stopPropagation();
    console.log(this.selectedProgram);
    this.saving = true;
    const data = {
      name: this.name,
      description: this.description,
      sortOrder: this.selectedProgram?.programStages[0]?.programStageSections
        ?.length,
      programStage: {
        id: this.selectedProgram?.programStages[0]?.id,
      },
      dataElements: [
        {
          id: this.allDataElements[0]?.id,
        },
      ],
    };

    this.httpClient.post('programStageSections', data).subscribe((response) => {
      if (response) {
        setTimeout(() => {
          this.saving = false;
        }, 1000);
      }
    });
  }

  onSelectItem(selected, type) {
    if (type == 'program') {
      this.programStageSections =
        selected.programStages[0]?.programStageSections;
      this.selectedProgram = selected;
      this.currentProgramStage = selected?.programStages[0];
      this.allDataElements = _.map(
        selected?.programStages[0]?.programStageDataElements,
        (programStageDataElement) => {
          return {
            id: programStageDataElement?.dataElement?.id,
            name: programStageDataElement?.dataElement?.name,
          };
        }
      );
      this.selectedDataElements = null;
    } else if (type == 'section') {
      this.currentProgramStageSection = selected;
      this.selectedDataElements = [];
      this.selectedDataElements = [
        ...this.selectedDataElements,
        ...this.currentProgramStageSection?.dataElements,
      ];
      this.formattedListOfDataElements = _.orderBy(
        _.filter(this.allDataElements, (dataElement) => {
          if (
            (_.filter(this.selectedDataElements, { id: dataElement?.id }) || [])
              ?.length == 0
          ) {
            return dataElement;
          }
        }),
        ['name'],
        ['asc']
      );
      console.log(this.currentProgramStageSection);
    }
  }

  // selectItem(item, e) {
  //   e.stopPropagation();
  //   this.selectedDataElements = _.uniqBy(
  //     [...this.selectedDataElements, item],
  //     'id'
  //   );
  //   this.formattedListOfDataElements = _.orderBy(
  //     _.filter(this.allDataElements, (dataElement) => {
  //       if (
  //         (_.filter(this.selectedDataElements, { id: dataElement?.id }) || [])
  //           ?.length == 0
  //       ) {
  //         return dataElement;
  //       }
  //     }),
  //     ['name'],
  //     ['asc']
  //   );
  // }

  // deSelectItem(item, e) {
  //   e.stopPropagation();
  //   this.selectedDataElements = _.filter(this.selectedDataElements, (elem) => {
  //     if (elem?.id !== item?.id) {
  //       return elem;
  //     }
  //   });

  //   this.formattedListOfDataElements = _.orderBy(
  //     _.filter(this.allDataElements, (dataElement) => {
  //       if (
  //         (_.filter(this.selectedDataElements, { id: dataElement?.id }) || [])
  //           ?.length == 0
  //       ) {
  //         return dataElement;
  //       }
  //     }),
  //     ['name'],
  //     ['asc']
  //   );
  // }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onSave(e) {
    e.stopPropagation();
    this.saving = true;
    const data = {
      id: this.currentProgramStageSection?.id,
      name: this.currentProgramStageSection?.name,
      sortOrder: this.currentProgramStageSection?.sortOrder,
      programStage: {
        id: this.currentProgramStage?.id,
      },
      dataElements: _.map(this.selectedDataElements, (dataElement) => {
        return {
          id: dataElement?.id,
        };
      }),
    };

    this.httpClient
      .put('programStageSections/' + this.currentProgramStageSection?.id, data)
      .subscribe((response) => {
        if (response) {
          setTimeout(() => {
            this.saving = false;
          }, 1000);
        }
      });
  }
}
