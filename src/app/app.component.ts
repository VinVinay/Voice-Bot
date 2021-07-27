import { Component } from '@angular/core';
import { SpeechService } from './speech.service';
import { voiceBotService } from './voiceBot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public ml: voiceBotService,
    public speech: SpeechService) {}
}
