import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PieChartMedalsComponent } from './pie-chart-medals/pie-chart-medals.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from "./header/header.component";
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [AppComponent, HomeComponent, PieChartMedalsComponent,NotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, HeaderComponent,NgxChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}