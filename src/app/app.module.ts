import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { voiceBotService } from './voiceBot.service';
import { ListenComponent } from './listen/listen.component';
import { SpeechService } from './speech.service';
import { AgGridModule } from 'ag-grid-angular';
import { ExcelService } from './excel-export.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ListenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    voiceBotService,
    SpeechService,
    ExcelService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
