import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchFieldModule } from '../../shared/search-field/search-field.module';
import { WeatherVisualizationComponent } from './weather-visualization/weather-visualization.component';
import { WeatherStoreService } from './weather-store.service';

@NgModule({
  declarations: [WeatherComponent, WeatherVisualizationComponent],
  exports: [WeatherComponent, HttpClientModule],
  providers: [WeatherStoreService],
  imports: [CommonModule, SearchFieldModule],
})
export class WeatherModule {}
