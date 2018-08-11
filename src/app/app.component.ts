import { Component, OnInit } from '@angular/core';
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

  scrollbarOptions = {
    axis: 'y',
    theme: 'dark-2',
    autoHideScrollbar: true,
    scrollInertia: 300,
    alwaysShowScrollbar: 1
  };

  markers: Marker[] = [
    // {
    //   lat: 55.76191328269146,
    //   lng: 37.63752769230757,
    //   label: 'A',
    //   draggable: false,
    //   url: '/assets/images/email.png'
    // },
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

  makeActiveAddr(addr: 'msk' | 'spb') {
    this.activeAddr = addr;
  }

  ngOnInit() {
    this.activeAddr = 'msk';
    console.log(data);
    console.log(stations);
  }

  mapClicked(event) {
    console.log(event.coords.lat);
    console.log(event.coords.lng);
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
