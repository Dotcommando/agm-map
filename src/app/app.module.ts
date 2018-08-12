import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    MalihuScrollbarModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCEZfcI1eXarkyXqC2sDC5gKRYRyRgSML4'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
