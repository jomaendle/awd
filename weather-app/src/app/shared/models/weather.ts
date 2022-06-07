export interface WeatherDto {
  location: Location;
  current: Weather;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  tz_id: string;
  localtime: string;
  lat: number;
  lon: number;
}

export interface Weather {
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_kph: number;
  humidity: number;
  feelslike_c: number;
}
