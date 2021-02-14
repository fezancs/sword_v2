import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';


const routes: Routes = [{path: '',
children: [
  {
    path: 'view/:id',
    component:ViewComponent
  }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewblogRoutingModule { }
