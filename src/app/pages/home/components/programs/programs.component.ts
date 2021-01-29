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
  configurations: any[]
  currentSectionIndicators: string[];
  allIndicators: any[];
  formattedIndicators: any[]

  constructor(private httpClient: NgxDhis2HttpClientService) {}

  ngOnInit(): void {}

  changeTab(e, val) {
    e.stopPropagation();
    this.selectedTab.setValue(val);
  }

  onSelectProgram(program, type?) {
    this.selectedProgram = program;
    this.configurations = [];
    this.currentSectionIndicators = [];
    this.allIndicators = this.selectedProgram?.programIndicators;
    if (!type) {
      
      this.allDataElements = _.map(
        program?.programStages[0]?.programStageDataElements,
        (programStageDataElement) => {
          return {
            id: programStageDataElement?.dataElement?.id,
            name: programStageDataElement?.dataElement?.name,
          };
        }
      );
    } else {
      this.httpClient.get("dataStore/msdqi-checklists/" + program?.id).subscribe(response => {
        if (response) {
          this.configurations = [];
          this.configurations = response
        }
      })
    }
  }

  onSelectConfigSection(section) {
    this.currentProgramStageSection = section;
    this.currentSectionIndicators = [];
    const filteredSectionConfigs = (_.filter(this.configurations, {id: section?.id}) || [])[0];
    this.currentSectionIndicators = filteredSectionConfigs ? _.map(filteredSectionConfigs?.indicators, id => {
      return (_.filter(this.allIndicators, {id: id}) || [])[0]
    }) : []
  }

  onAddDataStoreConfigs(e) {
    e.stopPropagation();
    
  }

  onSaveDataStoreConfigs(e) {
    e.stopPropagation();
    const currentUpdatedSectionConfigs = {
      ...(_.filter(this.configurations, {id: this.currentProgramStageSection?.id}) || [])[0],
        id: this.currentProgramStageSection?.id,
        name: this.currentProgramStageSection?.name,
        indicators: _.map(this.currentSectionIndicators, ind => {
          return ind?.id
        })
    }
    this.configurations = [..._.filter(this.configurations, configs => {
      if (configs?.id != currentUpdatedSectionConfigs?.id) {
        return configs
      }
    }), currentUpdatedSectionConfigs]
    this.saving = true;
    this.httpClient
      .put('dataStore/msdqi-checklists/' + this.selectedProgram?.id, this.configurations)
      .subscribe((response) => {
        if (response) {
          setTimeout(() => {
            this.saving = false;
          }, 1000);
        }
      });
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

      this.httpClient
      .get('programStageSections/' + this.currentProgramStageSection?.id + ".json?fields=*,dataElements[id,name]")
      .subscribe((response) => {
        if (response) {
          this.selectedDataElements = [
            ...this.selectedDataElements,
            ...response?.dataElements,
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
        }
      });
     
    }
  }
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
