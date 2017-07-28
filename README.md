Angular Metro Maps (AMM) Core - Angular 2+ Metro Maps components
=========

@angular-metro-maps/core contains solutions for the SVG Metro Maps.

[DEMO (plunkr)](https://plnkr.co/edit/h6AVb2fcPGm8aNHtavHL?p=preview)


# Getting Started

Import `AmmModule` from `angular-metro-maps/core`

```nashorn js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AmmModule } from '@angular-metro-maps/core';

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

Use `amm-metro-map` component

```nashorn js

@Component({
  selector: 'app-root',
  template: `
  <amm-metro-map 
         (mapClick)="metroClick($event)" 
        [(stations)]="metro"></amm-metro-map>
  `
})
export class AppComponent {
  
  public metro: string[] = [];
  
  public metroClick(mapEvent) {

      // sync data with metroMap click
      this.metro.forEach(item => {
  
        if (this.metro.indexOf(item.stationName) !== -1) {
          this.metro.push(item.stationName);
        } else {
          this.metro.splice(this.metro.indexOf(item.stationName), 1)  
        }
  
      });
      
  }
}			
```

### Documentation

amm-metro-map is currently supported with the following features. Options on how to use them in your own application are linked below.

| Option | Type |  Default | Params| Description |
| ------ | ------ | --------- | --------- | --------- |
| (mapClick) | function | null | | callback on map click
| [(stations)] | string[] | [] | | array of strings that sync map and your set of data
| [mapUrl] | string | null | 'spb' - (Sankt petersburg map)| url  to svg map (Default - Moscow map)

### Installation

`Angular metro maps` gets shipped via the Node Package Manager. So make sure that you have [NodeJS](https://nodejs.org) installed.

  You can install the package with the following command:

```shell
npm install @angular-metro-maps/core
```

### License

[MIT License](./LICENSE) © [falendary](https://github.com/falendary)

Metro map design © Art. Lebedev Studio
