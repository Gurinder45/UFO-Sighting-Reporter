import { Component, Output, EventEmitter, Input} from '@angular/core';
import { Report } from 'src/app/report';

@Component({
  selector: 'app-popup-handler',
  templateUrl: './popup-handler.component.html',
  styleUrls: ['./popup-handler.component.css']
})
export class PopupHandlerComponent {
  @Input() report!: Report;
  @Input() showMoreInfo!: boolean;
  @Output() onAddReport: EventEmitter<Report> = new EventEmitter();
  @Output() onRmvMoreInfo = new EventEmitter();
  showAddForm: boolean = false;
  

  moreInfoReport!: Report;

  addReport(report: Report): void {
    this.onAddReport.emit(report);
  }

  toggleAddForm(): void {
   this.showAddForm = !this.showAddForm;
  }

  ngOnChanges() {
    this.moreInfoReport = this.report;
  }

  removeMoreInfo(): void {
    this.onRmvMoreInfo.emit();
  }

}
