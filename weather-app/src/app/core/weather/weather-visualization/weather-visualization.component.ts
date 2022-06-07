import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WeatherStoreService } from '../weather-store.service';
import { Observable, pluck } from 'rxjs';
import { Weather, Location } from '../../../shared/models/weather';

@Component({
  selector: 'app-weather-visualization',
  templateUrl: './weather-visualization.component.html',
  styleUrls: ['./weather-visualization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherVisualizationComponent implements OnInit {
  weather$: Observable<Weather> = this._weatherStore.weather$.pipe(
    pluck('current')
  );

  location$: Observable<Location> = this._weatherStore.weather$.pipe(
    pluck('location')
  );

  constructor(private _weatherStore: WeatherStoreService) {}

  ngOnInit(): void {}
}
