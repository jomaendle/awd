import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { WeatherDto } from '../../shared/models/weather';
import { filter, Observable, pipe, tap } from 'rxjs';

interface WeatherState {
  weather: WeatherDto | null;
  weatherHistory: WeatherDto[];
}

const defaultWeatherState: WeatherState = {
  weather: null,
  weatherHistory: [],
};

@Injectable()
export class WeatherStoreService extends ComponentStore<any> {
  readonly setWeather: (weather: WeatherDto) => void = this.updater(
    (state: WeatherState, weather: WeatherDto) => ({
      ...state,
      weather,
    })
  );

  readonly addWeatherToHistory: (weather: WeatherDto) => void = this.updater(
    (state: WeatherState, weather: WeatherDto) => ({
      ...state,
      weatherHistory: [...state.weatherHistory, weather],
    })
  );

  weather$: Observable<WeatherDto> = this.select((state) => state.weather);
  weatherHistory$: Observable<WeatherDto[]> = this.select(
    (state) => state.weatherHistory
  );

  constructor() {
    super(defaultWeatherState);

    this.effect(
      pipe(
        filter((weather: WeatherDto) => !!weather),
        tap((weather: WeatherDto) => this.addWeatherToHistory(weather))
      )
    )(this.weather$);
  }
}
