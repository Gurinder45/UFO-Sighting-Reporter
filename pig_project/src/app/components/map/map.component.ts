import { Component, AfterViewInit} from '@angular/core';
import * as L from 'leaflet';
import { PigService } from 'src/app/services/pig.service';
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
  constructor(private pigService: PigService) {}

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
    this.pigService.getReports().subscribe((reports) => {
      let temp:any = reports;
      this.reports = temp.data;
      this.addMarkers();
    });
  }

  addMarkers(): void {
    
    this.reports.forEach((report) => {
      L.marker([parseFloat(report.lat), parseFloat(report.long)]).addTo(this.map)
    .bindPopup("<b>"+ report.location + "</b><br /> cases reported.");
    })
  }
}
