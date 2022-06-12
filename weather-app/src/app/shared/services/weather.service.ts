import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { WeatherDto } from '../models/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private _BASE_URL = 'http://api.weatherapi.com/v1/';

  constructor(private _httpClient: HttpClient) {}

  getCurrentWeather(cityName: string): Observable<WeatherDto | null> {
    return this._httpClient
      .get(
        `${this._BASE_URL}current.json?key=${environment.weatherApiKey}&q=${cityName}`
      )
      .pipe(
        map((response: any) => ({ ...response } as WeatherDto)),
        catchError((error: any) => {
          console.error('Error while fetching weather data: ', error);

          return of(null);
        })
      );
  }
}
