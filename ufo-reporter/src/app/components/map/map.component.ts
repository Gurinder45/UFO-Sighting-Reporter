import { Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import { UfoService } from 'src/app/services/ufo.service';
import { icon, Marker } from 'leaflet';
import { Report } from 'src/app/report';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  reports: Report[] = [];
  private map!: L.Map;
  markers = new L.FeatureGroup();
  constructor(private ufoService: UfoService) {}

  ngOnInit() {
    this.loadReports();
  }

  ngAfterViewInit(): void {
    this.map = L.map("mapid").setView([49.2, -123], 11);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3VyaW5kZXI0NSIsImEiOiJjbGIxbXh6ejcxdXUwM3Zxaml6bGw0ZjBiIn0.ZAMPKHWzksrftqwjfO7piA', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(this.map);
  }

  loadReports(): void {
    this.ufoService.getReports().subscribe((reports) => {
      let temp:any = reports;
      this.reports = temp.data;
      this.map.removeLayer(this.markers);
      this.markers.clearLayers();
      this.addMarkers();
    });
  }

  addMarkers(): void {
    let locations: { location: string; lat: string; long: string; count: number; }[] =[];
    let added:boolean = false;
    this.reports.forEach((report) => {
      added = false;
      let locationAddress = {
        location: report.location,
        lat: report.lat,
        long: report.long,
        count: 1
      }
      if(locations.length > 0) {
        for(let i = 0; i < locations.length; i++) {
          if (report.location == locations[i].location && report.lat == locations[i].lat && report.long == locations[i].long ) {
            locations[i].count++;
            added = true;
            break;
          }
        }
        if(!added) {
          locations.push(locationAddress);
        }  
      } else {
        locations.push(locationAddress);
      }
    })
    locations.forEach((address) => {
     let marker = L.marker([parseFloat(address.lat), parseFloat(address.long)]).addTo(this.map)
    .bindPopup("<b>"+ address.location + "</b><br /> Cases Reported: " + address.count);
    this.markers.addLayer(marker);
    })
    this.map.addLayer(this.markers);
  }
}
