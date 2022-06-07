import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WeatherStoreService } from '../weather-store.service';
import { Observable, pluck } from 'rxjs';
import { Weather, Location } from '../../../shared/models/weather';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from "@angular/platform-browser";

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

  constructor(private _weatherStore: WeatherStoreService, private _domSanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  getSafeUrl(lat: number, lon: number): SafeResourceUrl {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/?q=${lat},${lon}`);
  }
}
