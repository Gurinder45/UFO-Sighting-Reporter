import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { MapComponent } from './components/map/map.component';
import { ReportsComponent } from './components/reports/reports.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AddFormComponent } from './components/add-form/add-form.component';
import { PopupHandlerComponent } from './components/popup-handler/popup-handler.component';
import { MoreInfoComponent } from './components/more-info/more-info.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    MapComponent,
    ReportsComponent,
    AddFormComponent,
    PopupHandlerComponent,
    MoreInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatTableModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
