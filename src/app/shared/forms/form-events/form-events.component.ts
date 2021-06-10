import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { EventsService } from '../../services/events.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-form-events',
  templateUrl: './form-events.component.html',
  styleUrls: ['./form-events.component.scss']
})
export class FormEventsComponent implements OnInit {

  @ViewChild('start') start: any
  @ViewChild('end') end: any


  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public dateControl = new FormControl(new Date());

  event = {
    title: '',
    description: '',
    startTime: '',
    endTime: ''
  };

  endDate: string;
  startDate: string;

  modeUpdate: boolean;

  constructor
    (
      @Inject(MAT_DIALOG_DATA) public data: any,
      private eventsService: EventsService,
      public dialog: MatDialog,
      private uiService: UiService

    ) {
  }

  ngOnInit(): void {

    if (this.data) {

      this.modeUpdate = true;
      this.event = this.data;
      this.startDate = this.data.startTime;
      this.endDate = this.data.endTime;

    }
  }

  async editEvent(formEvent: NgForm) {

    if (this.modeUpdate) {

      if (formEvent.invalid) { return; }

      const update = await this.eventsService.editEvent(this.data._id, this.event)

      if (update) {

        this.dialog.closeAll();
        this.uiService.openSnackBar('Evento actualizado correctamente', 'OK');
        this.event = {
          title: '',
          description: '',
          startTime: '',
          endTime: ''
        };

      } else {
        alert('Error al actualizar evento')
      }

    } else {

      if (formEvent.invalid) { return; }

      this.event.startTime = JSON.stringify(this.startDate);


      const valid = await this.eventsService.createdEvent({
        title: this.event.title,
        description: this.event.description,
        startTime: new Date(this.startDate),
        endTime: new Date(this.endDate),
      });

      if (valid) {

        this.dialog.closeAll();
        this.uiService.openSnackBar('Evento creado correctamente', 'OK');

        this.event = {
          title: '',
          description: '',
          startTime: '',
          endTime: ''
        };

      } else {
        alert('Error al crear evento')
      }

    }

  }

  closeEvent() {
    this.dialog.closeAll();
  }
}
