import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Custom modules
import { CoreModule } from '../../core/core.module';
import { IntroComponent } from './intro.component';

// Module components
@NgModule({
  declarations: [
    IntroComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    IntroComponent
  ],
  providers: [],
})
export class IntroModule {}
