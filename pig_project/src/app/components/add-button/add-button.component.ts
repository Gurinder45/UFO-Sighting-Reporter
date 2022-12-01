import { Component, Output, EventEmitter} from '@angular/core';
import { Report } from 'src/app/report';


@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent {
  @Output() onAddReport: EventEmitter<Report> = new EventEmitter();
  showAddForm: boolean = false;

  addReport(report: Report): void {
    this.onAddReport.emit(report);

  }

  toggleAddForm(): void {
   this.showAddForm = !this.showAddForm;
  }
}
