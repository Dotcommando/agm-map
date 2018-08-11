import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MalihuScrollbarModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCEZfcI1eXarkyXqC2sDC5gKRYRyRgSML4'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
