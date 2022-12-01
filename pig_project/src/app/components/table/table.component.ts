
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTableDataSourcePaginator} from '@angular/material/table';
import { Report } from 'src/app/report';
import { PigService } from 'src/app/services/pig.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  reports: Report[] = [];
  displayedColumns: string[] = ['personName', 'personNumber', 'delete'];
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
}
