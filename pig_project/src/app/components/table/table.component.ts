
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTableDataSourcePaginator} from '@angular/material/table';
import { Report } from 'src/app/report';
import { PigService } from 'src/app/services/pig.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  reports: Report[] = [];
  report!: Report;
  showMoreInfo: boolean = false;
  displayedColumns: string[] = ['location', 'personName', 'time', 'status', 'more-info', 'delete'];
  dataSource!: MatTableDataSource<Report, MatTableDataSourcePaginator>;
  
  constructor(private pigService: PigService) { }

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  ngOnInit() {
    this.loadReports();
  }

  loadReports(): void {
    this.pigService.getReports().subscribe((reports) => {
      let temp:any = reports;
      this.reports = temp.data;
      this.dataSource = new MatTableDataSource(this.reports);
      this.dataSource.sort = this.sort;
    });
  }

  deleteAllReports(): void {
    this.pigService.deleteReport().subscribe((reports) => {
      this.reports = [];
      this.dataSource = new MatTableDataSource(this.reports);
      this.dataSource.sort = this.sort;
    }); 
  }

  deleteReport(report: Report) {
    if (this.passwordCheck()) {
      let index = this.reports.indexOf(report);
      if( index == -1) {
        return;
      }
      this.reports.splice(index, 1);
      const obj = {
      key: "reports",
      data: this.reports
    };
    this.updateReports(obj);
    }
  }

  addReport(report: Report): void {
    this.reports.push(report);
    const obj = {
      key: "reports",
      data: this.reports
    };
    this.updateReports(obj);
    
  }

  updateReports(obj: Object): void {
    this.deleteAllReports();
    this.pigService.postReports(obj).subscribe((reports) => {
      let temp:any = reports;
      this.reports = temp.data;
      this.dataSource = new MatTableDataSource(this.reports);
      this.dataSource.sort = this.sort;
    });
  }

  toggleStatus(report:Report): void {
    if (this.passwordCheck()) {
      if (report.status == "Ready for Pickup") {
        report.status = "Retrieved";
      } else {
        report.status = "Ready for Pickup";
      }
      const obj = {
        key: "reports",
        data: this.reports
      };
      this.updateReports(obj);
    }
  }

  passwordCheck(): boolean {
    const password = prompt("To confirm this action, please enter your password:")
    const md5 = new Md5();
    if (password) {
      const encrypted = md5.appendStr(password).end();
      if (encrypted == "84892b91ef3bf9d216bbc6e88d74a77c") {
        return true;
      }
    }
    alert("Incorrect Password")
    return false;

  }

  displayMoreInfo(report:Report): void {
    this.report = report;
    this.showMoreInfo = true;
  }

  rmvMoreInfo(): void {
    this.showMoreInfo = false;

  }



}
