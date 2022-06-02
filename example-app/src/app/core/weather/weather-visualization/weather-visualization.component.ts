import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-visualization',
  templateUrl: './weather-visualization.component.html',
  styleUrls: ['./weather-visualization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherVisualizationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
