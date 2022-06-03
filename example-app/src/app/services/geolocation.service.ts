import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  geolocation$: Observable<GeolocationPosition>;

  private _geolocation$: ReplaySubject<GeolocationPosition> =
    new ReplaySubject<GeolocationPosition>(1);

  constructor() {
    this.geolocation$ = this._geolocation$.asObservable();
    this.getGeolocation();
  }

  getGeolocation(): void {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        this._geolocation$.next(position);
      },
      (error: GeolocationPositionError) => {
        console.error(error);
      }
    );
  }
}
