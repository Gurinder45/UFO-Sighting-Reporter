import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Report } from 'src/app/report';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent {
  @Input() moreInfoReport!: Report;
  @Output() onRemoveInformation = new EventEmitter();

  removeInformation() {
    this.onRemoveInformation.emit();
  }


}
