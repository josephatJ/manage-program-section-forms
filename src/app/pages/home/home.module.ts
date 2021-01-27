import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { pages } from './pages';
import { ProgramsComponent } from './components/programs/programs.component';
import { SelectionFilterComponent } from './components/selection-filter/selection-filter.component';
import { FilterByTextPipe } from './pipes/filter-by-text.pipe';

@NgModule({
  declarations: [
    ...pages,
    ProgramsComponent,
    SelectionFilterComponent,
    FilterByTextPipe,
  ],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
})
export class HomeModule {}
