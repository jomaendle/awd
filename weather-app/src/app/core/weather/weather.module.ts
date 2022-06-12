import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchFieldModule } from '../../shared/components/search-field/search-field.module';
import { WeatherVisualizationComponent } from './weather-visualization/weather-visualization.component';
import { WeatherStoreService } from './weather-store.service';
import { ReactiveComponentModule } from '@ngrx/component';
import {GoogleMapsModule} from "@angular/google-maps";

@NgModule({
  declarations: [WeatherComponent, WeatherVisualizationComponent],
  exports: [WeatherComponent, HttpClientModule],
  providers: [WeatherStoreService],
    imports: [CommonModule, SearchFieldModule, ReactiveComponentModule, GoogleMapsModule],
})
export class WeatherModule {}
