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
  title = 'app';

  zoom: number = 8;

  lat: number = 51.673858;
  lng: number = 7.815982;

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ];

  ngOnInit() {
    console.log(data);
    console.log(stations);
  }

}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
