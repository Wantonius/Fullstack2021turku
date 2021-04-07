import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Bucket} from './bucket.component';
import { Apple} from './apple.component';
@NgModule({
  declarations: [
    AppComponent,
	Bucket,
	Apple
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
