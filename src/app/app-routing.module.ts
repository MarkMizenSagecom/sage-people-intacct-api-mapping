import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { IntroComponent } from './modules/intro/intro.component';
import { MappingComponent } from './modules/mapping/components/mapping/mapping.component';
import { environment } from 'src/environments/environment';


const routes: Routes = [
  {
    path: '',
    component: IntroComponent
  },
  {
    path: 'mapping',
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
