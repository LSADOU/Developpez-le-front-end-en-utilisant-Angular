
import { Component, Input, OnInit } from '@angular/core';
import { OlympicService } from '../core/services/olympic.service';
import { OlympicCountry } from '../core/models/OlympicCountry';

@Component({
    selector: 'app-pie-chart-medals',
    templateUrl: './pie-chart-medals.component.html',
    styleUrls: ['./pie-chart-medals.component.scss'],
    standalone: false
})
export class PieChartMedalsComponent implements OnInit{
 ;

  data!: { name: string; value: number}[];
  view: [number, number] = [800, 400];

  showLegend = false;
  showLabels = true;
  doughnut = false;

  nbCountry! : number;
  nbOlympics! : number; 

  constructor( private olympicService: OlympicService ) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData();
    this.olympicService.getOlympicCountries().subscribe((countries: OlympicCountry[] | undefined) => {
      this.data = [];
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
    this.olympicService.getNbCountry().subscribe((nbCountry: number) => {
      this.nbCountry = nbCountry;
    });
    this.olympicService.getNbJO().subscribe((nbJO: number) => {
      this.nbOlympics = nbJO;
    });
  }

  onClicOnCountry(event: any) {
    console.log('clic :', event);
  }
}