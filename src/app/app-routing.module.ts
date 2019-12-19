import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ListComponent } from './modules/list/components/list/list.component';
import { MappingComponent } from './modules/mapping/components/mapping/mapping.component';
import { environment } from 'src/environments/environment';


const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'mapping/new',
    component: MappingComponent
  },
  {
    path: 'mapping/:id',
    component: MappingComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        enableTracing: !environment.production
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
