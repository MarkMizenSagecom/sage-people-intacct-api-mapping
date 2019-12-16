import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Custom modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { modules } from './modules';

// App component
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducerToken, reducerProvider, metaReducers } from './store/reducers/app.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreModule.forRoot(reducerToken, { metaReducers }),
    // EffectsModule.forRoot([fromEffects.ExchangeRatesEffects, fromEffects.PlanningEffects, fromEffects.TeamMemberPlanCommentsEffects]),
    ...modules,
  ],
  providers: [
    reducerProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
