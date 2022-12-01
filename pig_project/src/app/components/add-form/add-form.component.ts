import { Component, Output, EventEmitter} from '@angular/core';
import { Report } from 'src/app/report';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {
  @Output() onAddReport: EventEmitter<Report> = new EventEmitter();
  @Output() onCancelReport = new EventEmitter();
  name!: string;
  number!: string;
  breed!: string;
  pid!: string;
  location!: string;
  lat!: string;
  long!: string;
  notes!: string;
 

  onSubmit(): void {
    const newReport = {
      personName: this.name,
      personNumber: this.number,
      breed: this.breed,
      pid: this.pid,
      location: this.location,
      lat: this.lat,
      long: this.long,
      notes: this.notes,
      status: "Ready for Pickup"
    }

    this.onAddReport.emit(newReport);

    this.hideForm();

  }

  hideForm(): void {
    this.onCancelReport.emit();

  }
}
