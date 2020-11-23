import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition;
declare var webkitSpeechGrammarList;
declare var webkitSpeechRecognitionEvent;
declare var SpeechRecognition;

@Injectable({providedIn: 'root'})
export class VoiceService {
    public speechRecognition;
    public speechGrammarList;
    public speechRecognitionEvent;
    public recognition;

    public voiceConfig = {
        volume: 5,
        speed : 1,
        pitch: 5
    };

    constructor() { 
        this.speechRecognitionEvent =  webkitSpeechRecognitionEvent;
        this.speechRecognition = new webkitSpeechRecognition();

    }

    initRecognition(grammar, ) {
        const speechRecognitionList = new webkitSpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);

        this.speechRecognition.grammars = speechRecognitionList;
        this.speechRecognition.continuous = false;
        this.speechRecognition.lang = 'en-US';
        this.speechRecognition.interimResults = false;
        this.speechRecognition.maxAlternatives = 1;

        this.speechRecognition.onresult = (event) => {
            var bg = document.querySelector('body');
            var color = event.results[0][0].transcript;
            (<HTMLInputElement>document.getElementById('colorInput')).value =  color;
            // diagnostic.textContent = 'Result received: ' + color + '.';
            bg.style.backgroundColor = color;
            this.speak(`Shivaan, You selected  ${color} color`);
            console.log('Confidence: ' + event.results[0][0].confidence);
          }
      
          this.speechRecognition.onspeechend = function() {
            this.speechRecognition.stop();
          }
      
          this.speechRecognition.onnomatch = function(event) {
              this.speak("I didn't recognise that color.");
          }
      
          this.speechRecognition.onerror = function(event) {
              this.speak('Error occurred in recognition: ' + event.error);
          }
    }

    speak(text: string) {
        let speech = new SpeechSynthesisUtterance();
        speech.lang = "en-US";
        speech.text = text;
        speech.volume = 6; //this.voiceConfig.volume;
        speech.rate = this.voiceConfig.speed;
        speech.pitch = 1; // this.voiceConfig.pitch;
    
        window.speechSynthesis.speak(speech);
        return speech;
      }
   

    
}