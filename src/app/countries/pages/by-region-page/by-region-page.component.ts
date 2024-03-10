import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Region } from '../../interfaces/region.type';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public regSelect?: string;

  constructor(private countriesService: CountriesService) { }
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.regSelect = this.countriesService.cacheStore.byRegion.term;
  }

  searchByRegion(region: Region) {
    this.isLoading = true;
    this.regSelect = region;
    this.countriesService.searchBy('region', region)
      .subscribe(data => {
        this.countries = data
        this.isLoading = false
      });
  }
}
