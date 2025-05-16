import { Component, Input, OnInit } from '@angular/core';
import { Assembly } from '../../interfaces/assembly.interface';

@Component({
  standalone: true,
  selector: '[app-stud]',
  templateUrl: './stud.component.html',
  styleUrl: './stud.component.scss'
})
export class StudComponent implements OnInit {

  @Input() assembly!: Assembly;
  @Input() nominal_diameter: number = 8;
  @Input() base_diameter: number = 12;
  @Input() base_lenght: number = 16;
  @Input() nominal_lenght: number = 24;
  @Input() thread_lenght: number = 18;
  @Input() withdrawal: number = 0.3;
  @Input() ch_length: number = 1;

  ngOnInit(): void {
    this.nominal_diameter *= this.assembly.scale;
    this.base_diameter *= this.assembly.scale;
    this.base_lenght *= this.assembly.scale;
    this.nominal_lenght *= this.assembly.scale;
    this.thread_lenght *= this.assembly.scale;
    this.withdrawal *= this.assembly.scale;
    this.ch_length *= this.assembly.scale;
  }

  getPoints(): string {

    let points = [
      [
        this.assembly.faceLeft,
        this.assembly.axisTop - 0.5 * this.base_diameter
      ],
      [
        this.assembly.faceLeft,
        this.assembly.axisTop - 0.5 * this.nominal_diameter
      ],
      [
        this.assembly.faceLeft + this.nominal_lenght - this.ch_length,
        this.assembly.axisTop - 0.5 * this.nominal_diameter,
      ],
      [
        this.assembly.faceLeft + this.nominal_lenght,
        this.assembly.axisTop - 0.5 * this.nominal_diameter + this.assembly.threadOffset,
      ],
      [
        this.assembly.faceLeft + this.nominal_lenght,
        this.assembly.axisTop + 0.5 * this.nominal_diameter - this.assembly.threadOffset,
      ],
      [
        this.assembly.faceLeft + this.nominal_lenght - this.ch_length,
        this.assembly.axisTop + 0.5 * this.nominal_diameter,
      ],
      [
        this.assembly.faceLeft,
        this.assembly.axisTop + 0.5 * this.nominal_diameter,
      ],
      [
        this.assembly.faceLeft,
        this.assembly.axisTop + 0.5 * this.base_diameter,
      ],
      [
        this.assembly.faceLeft - this.base_lenght,
        this.assembly.axisTop + 0.5 * this.base_diameter,
      ],
      [
        this.assembly.faceLeft - this.base_lenght,
        this.assembly.axisTop - 0.5 * this.base_diameter,
      ],
      [
        this.assembly.faceLeft,
        this.assembly.axisTop - 0.5 * this.base_diameter
      ],
    ];

    return points.map(coords => coords.join(",")).join(",")
  }
}
