import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageIndicatorsHomeComponent } from './manage-indicators-home/manage-indicators-home.component';

const routes: Routes = [
  {
    path: '',
    component: ManageIndicatorsHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageIndicatorsRoutingModule {}
