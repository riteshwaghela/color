import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

import { VoiceService } from './services/voice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isSettings: boolean = false;

  constructor(public voiceService: VoiceService) {
  }


  ngOnInit(): void {
    var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
    var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
    this.voiceService.initRecognition(grammar);
  }

  onMicClick(event) {
    this.voiceService.speechRecognition.start();
  }

   changeBodyColor(event) {
    const selectedColor =  event.currentTarget.value;
    const speech = this.voiceService.speak(`Shivaan, You selected  ${event.currentTarget.value} color`);
    speech.onend = () => {
      document.body.style.backgroundColor = selectedColor;
    }
  }

  onSettingsClick(event) {
      document.body.style.backgroundColor = 'white';
      this.isSettings = true;
  }

  onSpeedChange(event) {
    this.voiceService.voiceConfig.speed =  event.currentTarget.value;
  }

  onPitchChange(event) {
    this.voiceService.voiceConfig.pitch =  event.currentTarget.value;
  }



}
