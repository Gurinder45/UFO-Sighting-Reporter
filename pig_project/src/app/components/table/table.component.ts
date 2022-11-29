import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { REPORTS } from 'src/app/mock-report';
import { Report } from 'src/app/report';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  reports: Report[] = REPORTS;
  displayedColumns: string[] = ['personName', 'personNumber'];
  dataSource = new MatTableDataSource(this.reports);

  

  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }
}
