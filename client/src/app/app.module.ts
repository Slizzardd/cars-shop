import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/UI/header/header.component';
import {FooterComponent} from './components/UI/footer/footer.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainPageComponent} from './components/pages/main-page/main-page.component';
import {TopCarsSwiperComponent} from './components/top-cars-swiper/top-cars-swiper.component';
import {SearchCarComponent} from './components/search-car/search-car.component';
import {register} from 'swiper/element/bundle';

register();

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    TopCarsSwiperComponent,
    SearchCarComponent,
  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
