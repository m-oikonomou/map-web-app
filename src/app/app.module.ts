import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapsService } from './maps.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD8q_NvFGTutZ9CVzeFyb3Vt5rIqN8ieBM',
      libraries: ["places"],
      apiVersion: 'quarterly'
    }),
    HttpClientModule
  ],
  providers: [MapsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
