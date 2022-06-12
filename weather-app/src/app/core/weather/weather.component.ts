import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from 'src/app/shared/services/weather.service';
import {filter, finalize, map, of, ReplaySubject, Subject, switchMap, take, tap,} from 'rxjs';
import {WeatherDto} from '../../shared/models/weather';
import {WeatherStoreService} from './weather-store.service';
import {GeolocationService} from '../../shared/services/geolocation.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit, OnDestroy {

  isLoading$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _weatherService: WeatherService,
    private _weatherStore: WeatherStoreService,
    private _geolocationService: GeolocationService,
    private _themeService: ThemeService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading$.next(true);
    this._cdr.markForCheck();

    this._weatherStore.weatherHistory$.subscribe();
    this._geolocationService.geolocation$
      .pipe(
        switchMap(({ coords }: GeolocationPosition) =>
          this._weatherService
            .getCurrentWeather(`${coords.latitude},${coords.longitude}`)
        )
      )
      .subscribe((weather: WeatherDto | null) => {
        if (weather) {
          this._weatherStore.setWeather(weather);
        }

        this.isLoading$.next(false);
        this._cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onSearchTextChange(searchText: string): void {
    this._weatherStore.weatherHistory$
      .pipe(
        tap(() => {
          this.isLoading$.next(true);
          this._cdr.markForCheck();
        }),
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
        }),
        finalize(() => {
          this.isLoading$.next(false);
          this._cdr.markForCheck();
        })
      )
      .subscribe((weather: WeatherDto | null) => {
        if (weather) {
          this._weatherStore.setWeather(weather);
        }
      });
  }
  onDarkThemeSwitch(): void {
    this._themeService.toggleDarkTheme();
  }
}
