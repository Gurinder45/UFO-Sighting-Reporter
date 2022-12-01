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

  onSubmit(): void {
    const newReport = {
      personName: this.name,
      personNumber: this.number
    }

    this.onAddReport.emit(newReport);

    this.name = '';
    this.number = '';

  }

  cancelPressed(): void {
    this.onCancelReport.emit();

  }
}
