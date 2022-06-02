import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import {
  filter,
  map,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { WeatherDto } from '../../shared/models/weather';
import { WeatherStoreService } from './weather-store.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _weatherService: WeatherService,
    private _weatherStore: WeatherStoreService
  ) {}

  ngOnInit(): void {
    this._weatherStore.weatherHistory$.subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onSearchTextChange(searchText: string): void {
    this._weatherStore.weatherHistory$
      .pipe(
        take(1),
        map((weatherHistory: WeatherDto[]) =>
          weatherHistory.find((weather: WeatherDto) =>
            weather.location.name
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
        ),
        tap((x) => console.log('in Pipe', x)),
        switchMap((weatherItem: WeatherDto | undefined) => {
          if (weatherItem) {
            console.log('return from history', weatherItem);

            return of(weatherItem);
          }

          return this._weatherService.getCurrentWeather(searchText).pipe(
            filter((weather: WeatherDto | null) => !!weather),
            tap((x) => console.log('from be', x))
          );
        })
      )
      .subscribe((weather: WeatherDto | null) => {
        if (weather) {
          this._weatherStore.setWeather(weather);
        }
      });
  }
}
