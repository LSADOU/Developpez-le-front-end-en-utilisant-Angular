
import { Component, Input, OnInit } from '@angular/core';
import { OlympicService } from '../core/services/olympic.service';
import { OlympicCountry } from '../core/models/OlympicCountry';

@Component({
    selector: 'app-pie-chart-medals',
    templateUrl: './pie-chart-medals.component.html',
    styleUrls: ['./pie-chart-medals.component.scss'],
    standalone: false
})
export class PieChartMedalsComponent implements OnInit {
  data: { name: string; value: number }[] = [];
  view: [number, number] = [500, 400];

  showLegend = true;
  showLabels = true;
  doughnut = false;

  nbCountry : number = 0;
  nbOlympics : number = 0; 

  constructor(private olympicService: OlympicService) {
    olympicService.loadInitialData();
  }

  ngOnInit(): void {
    this.olympicService.getOlympicCountries().subscribe((countries: OlympicCountry[] | undefined) => {
      this.data = [];
      console.log(this.data);
      if (countries) {
        for (const country of countries) {
          const c = {
            name: country.countryName,
            value: country.getTotalMedals()
          };
        this.data.push(c);
        }
      }
    });
    this.nbCountry = this.data.length;
  }

  onClicOnCountry(event: any) {
    console.log('clic :', event);
  }
}