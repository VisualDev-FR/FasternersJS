import { Component } from '@angular/core';
import { StudComponent } from './standards/stud/stud.component';
import { Assembly } from './interfaces/assembly.interface';

@Component({
  selector: 'app-root',
  imports: [
    StudComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  assembly: Assembly = {
    threadOffset: 1,
    scale: 10,
    axisTop: 300,
    faceLeft: 800,
    axisOverflow: 0,
    faceOverflow: 20,
    holeOffset: 1,
    nominalDiameter: 6,
  }
}
