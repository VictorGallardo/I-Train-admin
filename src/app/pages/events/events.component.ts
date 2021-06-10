import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IEvent } from 'src/app/interfaces/interfaces';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { FormEventsComponent } from 'src/app/shared/forms/form-events/form-events.component';
import { UiService } from 'src/app/shared/services/ui.service';
import { EventsService } from '../../shared/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  position: number;
  searchKey: string;

  dataSource: MatTableDataSource<IEvent>;
  events: IEvent[] = [];
  columns: string[] = ['num', 'id', 'title', 'description', 'start', 'end', 'buttons'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor
    (
      private eventsService: EventsService,
      private uiService: UiService,
      public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.loadEvents();
    console.log(this.events);

  }

  loadEvents() {
    this.eventsService.getEvents()
      .subscribe(resp => {
        console.log(resp);
        this.events.push(...resp.events);
        this.dataSource = new MatTableDataSource(this.events)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  search(ev: any) {
    const filter = (ev.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase()
  }


  deleteEventDialog(eventId: string) {

    const dialog = this.uiService.deleteRecordDialog
      (
        eventId,
        '¿De verdad quieres eliminar este registro? este proceso no se puede deshacer.',
        'event',
        DeleteDialogComponent
      );
    dialog.afterClosed().subscribe(() => {

      this.events = [];
      this.loadEvents();

    });

  }

  addEventDialog() {

    const dialogRef = this.dialog.open(FormEventsComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {

      this.events = [];
      this.loadEvents();

    });

  }

  editEventDialog(event: IEvent) {

    const dialogRef = this.dialog.open(FormEventsComponent, {

      data: event
    });

    dialogRef.afterClosed().subscribe(() => {

      this.events = [];
      this.loadEvents();

    });

  }
}
