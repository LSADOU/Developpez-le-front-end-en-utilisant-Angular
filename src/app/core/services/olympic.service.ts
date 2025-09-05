import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/OlympicCountry';
import { Participation } from '../models/Participation';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympicCountries$ = new BehaviorSubject<OlympicCountry[] | undefined>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {

    this.http.get<any[]>(this.olympicUrl).subscribe({
      next: (countriesJson) => {
        const countries: OlympicCountry[] = [];
        for (const country of countriesJson) {
          const participations : Participation[] = [];
          for (const participation of country.participations) {
            const newParticipation = {
              id : participation.id,
              year : participation.year,
              city: participation.city,
              medalsCount : participation.medalsCount,
              athleteCount : participation.athleteCount
            };
            participations.push(newParticipation);
          }
          const newCountry = new OlympicCountry(country.id, country.country, participations);
          countries.push(newCountry);
        }
        this.olympicCountries$.next(countries);
      },
      error: (err) => {
        console.error('Erreur en chargeant les données :', err);
        this.olympicCountries$.next(undefined);
      }
    });
  }
  
  getOlympicCountries() {
    return this.olympicCountries$.asObservable();
  }

  getTotalMedalsByID(id: string): number {
    const countries = this.olympicCountries$.getValue();
    if (!countries) return 0; 
    const foundCountry : OlympicCountry | undefined = countries.find(c => c.id === id);
    return foundCountry?.getTotalMedals() ?? 0;
  }


}
