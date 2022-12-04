import { Component, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { MapComponent } from './components/map/map.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pig_project';

  @ViewChild(MapComponent) map!: MapComponent;

  refresh(): void {
    this.map.loadReports();
  }
}
