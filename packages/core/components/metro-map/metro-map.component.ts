/**
 * Created by szhitenev on 17.07.17.
 */
import { Component, Input, Output, EventEmitter, ElementRef, Inject, OnChanges, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';

import { Document } from '../../opaque-tokens/document';

import 'rxjs/add/operator/toPromise';
import { OutputData } from '../../metro-map-types';

@Component({
  templateUrl: './metro-map.component.html',
  selector: 'amm-metro-map'
})

export class MetroMapComponent implements OnChanges, AfterViewInit {

  @Input() mapUrl: string;

  @Input() stations: string[];
  @Output() stationsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output() mapClick: EventEmitter<OutputData> = new EventEmitter<OutputData>();

  public allNames: string[] = [];

  constructor(@Inject(Document) private document: any, private http: Http) {
  }

  public onClick(event: any) {

    if (event.srcElement.parentElement.classList.contains('active')) {
      event.srcElement.parentElement.classList.remove('active');
    } else {
      event.srcElement.parentElement.classList.add('active');
    }

    let eventData = {
      stationName: event.srcElement.parentElement.getAttribute('metro-station-name'),
      isActive: !!event.srcElement.parentElement.classList.contains('active')
    };

    if (eventData.isActive) {
      this.stations.push(eventData.stationName);
    } else {
      this.stations.splice(this.stations.indexOf(eventData.stationName), 1);
    }

    this.stationsChange.emit(this.stations);

    this.mapClick.emit({
      event: event,
      data: eventData
    });
  }

  private addStyles() {

    let svgCSS =
      '@import url("//fonts.googleapis.com/css?family=PT+Sans&subset=cyrillic");' +
      'g.metro-station{cursor:pointer}g.metro-station.disabled{cursor:initial}g.metro-station.selected text,g.metro-station.selected tspan{font-weight:700!important}g.metro-station.disabled text,g.metro-station.disabled tspan{fill:gray;cursor:initial}g.metro-station text.style1{font-family:"PT Sans","sans-serif";font-weight:400;font-style:normal;font-stretch:normal;font-variant:normal;font-size:20px}g.metro-station .metro-point{display:none}g.metro-station.active .metro-point{display:inline}';

    let style = document.createElement('style');
    style.id = 'dvhb_metro_style_inline';
    style.type = 'text/css';
    style.innerHTML = svgCSS;

    this.document.querySelector('amm-metro-map').appendChild(style);

  }

  private prepareSVG() {

    // console.log('this', this.document);

    let stations = this.document.querySelectorAll('[id^="s"]') || [];

    stations.forEach(station => {

      // console.log('station', station);

      let circle = station.querySelector('circle:last-child');
      let name = station.querySelector('text') ? station.querySelector('text').textContent : null;

      station.classList.add('metro-station');
      if (name) {
        station.setAttribute('metro-station-name', name);
      }
      if (circle) {
        circle.classList.add('metro-point');
      }
    });

    let stationsGroups = this.document.querySelectorAll('[id^="g"]');
    stationsGroups.forEach(group => {
      group.classList.add('metro-station');
      group.setAttribute('metro-station-group', '');
    });

  }

  private syncMap() {

    let items = this.document.querySelectorAll('[id^="s"]');
    let length = this.document.querySelectorAll('[id^="s"]').length;

    for (let i = 0; i < length; i = i + 1) {

      if (items[i].querySelector('text')) {

        let text = items[i].querySelector('text').textContent;

        if (this.stations.indexOf(text) !== -1) {
          items[i].classList.add('active');
        }
      }

    }

  }

  ngOnChanges() {
    this.syncMap();
  }

  public initMap() {

    if (this.mapUrl && this.mapUrl !== 'spb') {

      this.http.get(this.mapUrl).toPromise()
        .then((response: any) => {

          this.document.querySelector('amm-metro-map .metro-map').innerHTML = response._body;

          this.prepareSVG();

          this.allNames = this.document.querySelectorAll('[metro-station-name]');
          this.allNames = [].map.call(this.allNames, a => {
            return a.attributes['metro-station-name'].nodeValue;
          });

          this.syncMap();

          this.document.querySelector('amm-metro-map .metro-map svg').addEventListener('click', event => {
            this.onClick(event);
          });

        });

    } else {

      this.prepareSVG();

      this.allNames = this.document.querySelectorAll('[metro-station-name]');
      this.allNames = [].map.call(this.allNames, a => {
        return a.attributes['metro-station-name'].nodeValue;
      });

      this.syncMap();

    }

  }

  ngAfterViewInit() {

    this.addStyles();
    this.initMap();

  }

}
