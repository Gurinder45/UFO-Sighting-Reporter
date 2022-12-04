import { Component, Output, EventEmitter} from '@angular/core';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { Report } from 'src/app/report';
import { PigService } from 'src/app/services/pig.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {
  @Output() onAddReport: EventEmitter<Report> = new EventEmitter();
  @Output() onCancelReport = new EventEmitter();
  reports: Report[] = [];
  showNewLocation: boolean = true;
  locations: { location: string; lat: string; long: string; combined: string; }[] = [];
  selectedLocation!: { location: string; lat: string; long: string; combined: string; };
  name!: string;
  number!: string;
  breed!: string;
  pid!: string;
  location: string = "";
  lat: string = "";
  long: string = "";
  notes!: string;

  constructor(private pigService: PigService) {}
 
  ngOnInit() {
    this.pigService.getReports().subscribe((reports) => {
      let temp:any = reports;
      this.reports = temp.data;
      this.getUniqueLocations();
    });
  }

  onSubmit(): void {
    if(this.validateInput()) {
      const newReport = {
        personName: this.name,
        personNumber: this.number,
        breed: this.breed,
        pid: this.pid,
        location: this.location,
        lat: this.lat,
        long: this.long,
        notes: this.notes,
        time: (new Date().getTime()),
        status: "Ready for Pickup"
      }
      if(!this.showNewLocation) {
        newReport.location = this.selectedLocation.location;
        newReport.lat = this.selectedLocation.lat;
        newReport.long = this.selectedLocation.long;
      }
      this.onAddReport.emit(newReport);
      this.hideForm();
    }
  }

  hideForm(): void {
    this.onCancelReport.emit();
  }

  validateInput(): boolean {
    if(this.showNewLocation) {
      if(this.location == '') {
        alert("Please fill in the Location")
        return false;
      }
      if(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,10})?))$/.test(this.lat) == false) {
        alert("Enter a valid latitude");
        return false;
      }
      if(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,10})?))$/.test(this.long) == false) {
        alert("Enter a valid longitude");
        return false;
      }
      for(let i=0; i<this.locations.length; i++) {
        if (this.locations[i].location.trim() == this.location.trim() ) {
          alert("A report under this location name already exist. Please check if your location has already been entered, or add additional details about your location.");
          return false;
        }
        if (this.locations[i].lat == this.lat && this.locations[i].long == this.long) {
          alert("A report under these coordinates already exist, please select the existing location for these coordinates.");
          return false;
        }
      }
    } else {
      if (this.selectedLocation == undefined) {
        alert("Please Select a Location");
        return false;
      }
    }
    if(/^\d{3}-\d{3}-\d{4}$/.test(this.number) == false) {
      alert("Enter a 10 digit phone number in form '###-###-####'");
      return false;
    }
    if(isNaN(Number(this.pid))) {
      alert("Enter only integers for Pid");
      return false;  
    }
  return true;
  }

  getUniqueLocations(): void {
    let added:boolean = false;
    this.reports.forEach((report) => {
      added = false;
      let locationAddress = {
        location: report.location,
        lat: report.lat,
        long: report.long,
        combined: report.location + "    { " + report.lat + " , " + report.long + " }" 
      }
      if(this.locations.length > 0) {
        for(let i = 0; i < this.locations.length; i++) {
          if (report.location == this.locations[i].location && report.lat == this.locations[i].lat && report.long == this.locations[i].long ) {
            added = true;
            break;
          }
        }
        if(!added) {
          this.locations = [...this.locations, locationAddress];
        }  
      } else {
        this.locations = [...this.locations, locationAddress];
      }
    })
  }

  toggleCheckBox(): void {
    this.showNewLocation = !this.showNewLocation;
  }
}
