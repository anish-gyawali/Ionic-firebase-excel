import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPagePage } from './landing-page.page';

const routes: Routes = [
  {
    path: '',
    component: LandingPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPagePageRoutingModule {}
