import { Component, Input } from '@angular/core';
import { Report } from 'src/app/report';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  @Input() report!: Report;
 

}
