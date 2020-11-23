import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

declare var webkitSpeechRecognition;
declare var webkitSpeechGrammarList;
declare var webkitSpeechRecognitionEvent;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  speak(text: string) {
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
    speech.text = text;
    speech.volume = 10;
    speech.rate = 1;
    speech.pitch = 5;                

    window.speechSynthesis.speak(speech);
  }

  ngOnInit(): void {
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

    var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
    var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    var diagnostic = document.querySelector('.output');
    var bg = document.querySelector('body');
    var hints = document.querySelector('.hints');

      var colorHTML= '';
      colors.forEach(function(v, i, a){
        console.log(v, i);
        colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
      });

  // hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try ' + colorHTML + '.';

    document.getElementById('mic').onclick = function() {
      recognition.start();
    }

    recognition.onresult = (event) => {
      // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
      // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
      // It has a getter so it can be accessed like an array
      // The first [0] returns the SpeechRecognitionResult at the last position.
      // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
      // These also have getters so they can be accessed like arrays.
      // The second [0] returns the SpeechRecognitionAlternative at position 0.
      // We then return the transcript property of the SpeechRecognitionAlternative object
      var color = event.results[0][0].transcript;
      (<HTMLInputElement>document.getElementById('colorInput')).value =  color;
      // diagnostic.textContent = 'Result received: ' + color + '.';
      bg.style.backgroundColor = color;
      this.speak(`Shivaan, You selected  ${color} color`);
      console.log('Confidence: ' + event.results[0][0].confidence);
    }

    recognition.onspeechend = function() {
      recognition.stop();
    }

    recognition.onnomatch = function(event) {
        this.speak("I didn't recognise that color.");
    }

    recognition.onerror = function(event) {
        this.speak('Error occurred in recognition: ' + event.error);
    }
  }

   changeBodyColor(element) {
    this.speak(`Shivaan, You selected  ${element.currentTarget.value} color`);
    document.body.style.backgroundColor = element.currentTarget.value;
}



}
