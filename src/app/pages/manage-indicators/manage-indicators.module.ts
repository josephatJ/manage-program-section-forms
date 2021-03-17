import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { ManageIndicatorsRoutingModule } from './manage-indicators-routing.module';
import { ManageIndicatorsHomeComponent } from './manage-indicators-home/manage-indicators-home.component';

@NgModule({
  declarations: [ManageIndicatorsHomeComponent],
  imports: [CommonModule, SharedModule, ManageIndicatorsRoutingModule],
})
export class ManageIndicatorsModule {}
