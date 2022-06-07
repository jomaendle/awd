import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {WeatherStoreService} from '../weather-store.service';
import {filter, Observable, pluck, tap} from 'rxjs';
import {Location, Weather} from '../../../shared/models/weather';
import {Title} from "@angular/platform-browser";

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
    pluck('location'),
    filter((location: Location) => !!location),
    tap((location: Location) => {
      this.googleMapsOptions = {
        center: {
          lat: location.lat,
          lng: location.lon,
        },
        zoom: 13
      }

      this._title.setTitle(location.name + ' - Weather app');
    },
  ));

  googleMapsOptions: google.maps.MapOptions = {
    center: { lat: -34.397, lng: 150.644 },
  }

  constructor(private _weatherStore: WeatherStoreService, private _title: Title) {}

  ngOnInit(): void {}
}
