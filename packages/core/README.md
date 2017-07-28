Angular Metro Maps (AMM) Core - Angular 2+ Metro Maps components
=========

@angular-metro-maps/core contains solutions for the SVG Metro Maps.


# Getting Started

```nashorn js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AmmModule } from '@angular-metro-maps/core';

@Component({
  selector: 'app-root',
  template: `
  <amm-metro-map (mapClick)="metroClick($event)" [(stations)]="metro"></amm-metro-map>
  `
})
export class AppComponent {
  
  public metro: string[] = [];
  
  public metroClick(mapEvent) {

      this.metro.forEach(item => {
  
        if (this.metro.indexOf(item.stationName) !== -1) {
          this.metro.push(item.stationName);
        } else {
          this.metro.splice(this.metro.indexOf(item.stationName), 1)  
        }
  
      });
      
  }
}

@NgModule({
  imports: [
    BrowserModule,
    AmmModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
			
```

### Documentation

amm-metro-map is currently supported with the following features. Options on how to use them in your own application are linked below.

| Option | Type |  Default | Params| Description |
| ------ | ------ | --------- | --------- | --------- |
| (mapClick) | function | null | | callback on map click
| [(stations)] | string[] | [] | | array of strings that sync map and your set of data
| [mapUrl] | string | null | 'spb' - (Sankt petersburg map)| url  to svg map (Default - Moscow map)


The sources for this package are in the [angular-metro-maps](https://github.com/falendary/angular-metro-maps) repository. Please file issues and pull requests against that repo.


### License

License: See LICENSE file in this folder © [falendary](https://github.com/falendary).

Metro map design © Art. Lebedev Studio