import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import '../assets/data/data.js';
import '../assets/data/stations.js';

declare var data: any;
declare var stations: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  _activeAddr: 'msk' | 'spb' = 'spb';
  set activeAddr(val: 'msk' | 'spb') {
    this._activeAddr = val;
    if (val === 'msk') {
      this.lat = this.msk.lat;
      this.lng = this.msk.lng;
    }
    if (val === 'spb') {
      this.lat = this.spb.lat;
      this.lng = this.spb.lng;
    }
  }
  get activeAddr(): 'msk' | 'spb' {
    return this._activeAddr;
  }

  stations: any;

  /* Информация для формирования графика */
  labels: string[] = [];

  barChartData: any[] = [];

  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  showChart: boolean[] = [];
  /* Конец информации для формирования графика */

  icon = {
    url: '/assets/images/marker.svg',
    scaledSize: {
      width: 20,
      height: 30
    }
  };

  zoom = 15;

  lat = 55.709944041168015;
  lng = 37.65416946326616;

  msk: Coords = {
    lat: 55.709944041168015,
    lng: 37.65416946326616
  };

  spb: Coords = {
    lat: 59.909907089902475,
    lng: 30.28545512988478
  };

  markers: Marker[] = [
    {
      lat: this.msk.lat,
      lng: this.msk.lng,
      label: '',
      url: '/assets/images/hpmd-icon-msk.png',
      text: `ул. Ленинская Слобода, 19
             Бизнес-центр «Омега плаза»`
    },
    {
      lat: this.spb.lat,
      lng: this.spb.lng,
      label: '',
      url: '/assets/images/hpmd-icon-spb.png',
      text: `наб. Обводного канала 199,
             «Обводный двор», офис 3 «А»`
    }
  ];

  /**
   * Мемоизируем вывод информации для формирования графика,
   * т.к. это чистая функция.
   */
  memoGetData: (name: string, id: string) => any = _.memoize(this.getData);

  makeActiveAddr(addr: 'msk' | 'spb') {
    this.activeAddr = addr;
  }

  renderGraphics(i: number) {
    this.showChart[i] = true;
    // this.icon.scaledSize.width = 40;
    // this.icon.scaledSize.height = 60;
  }

  closeChart(i: number) {
    this.showChart[i] = false;
  }

  fillLabels() {
    const shouldFillLabels = (this.labels.length <= 0);
    if (!shouldFillLabels) { return; }
    const checkins = data.checkins_timestamps;
    const len = checkins.length;
    for (let i = 0; i < len; i++) {
      this.labels.push(checkins[i].time);
    }
  }

  /**
   * Получаем данные для графика на каждый момент времени для точки.
   *
   * @param name
   * @param id
   */
  getData(name: string, id: string): any[] {
    const checkins = data.checkins_timestamps;
    const targetStationCheckins = [];
    const len = checkins.length;
    for (let i = 0; i < len; i++) {
      const point = checkins[i].stations_checkins_count.find((item) => item.id_station === id);
      if (!!point) {
        targetStationCheckins.push(parseInt(point.count, 10));
      }
    }
    return [{data: targetStationCheckins, label: name}];
  }

  /**
   * Получаем координаты точки по клику на карте.
   * @param event
   */
  mapClicked(event) {
    console.log(event.coords.lat, event.coords.lng);
  }

  ngOnInit() {
    this.activeAddr = 'spb';
    const len = stations.length;
    this.stations = [];
    for (let i = 0; i < len; i++) {
      this.showChart[i] = false;
      this.stations.push({
        lat: parseFloat(stations[i].lat),
        lng: parseFloat(stations[i].lng),
        id: stations[i].id,
        name: stations[i].name
      });
    }
    this.fillLabels();
  }

}

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  url?: any;
  text: string;
}

interface Coords {
  lat: number;
  lng: number;
}
