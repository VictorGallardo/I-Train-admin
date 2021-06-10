import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-form-items',
  templateUrl: './form-items.component.html',
  styleUrls: ['./form-items.component.scss']
})
export class FormItemsComponent implements OnInit {

  modeUpdate: boolean;

  item = {

    title: '',
    description: '',
    preparation: 0,
    sets: 0,
    time: 0,
    restSets: 0,
    repeats: 0,
    restReps: 0,
    list: ''

  }

  preparation: number;
  preparationMin: number = 0;
  preparationSec: number = 0;
  timeMin: number = 0;
  timeSec: number = 0;
  restRepsMin: number = 0;
  restRepsSec: number = 0;
  restSetsMin: number = 0;
  restSetsSec: number = 0;
  listId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemsService: ItemsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if (this.data) {

      this.modeUpdate = true;
      this.item = this.data

      this.preparationMin = Math.trunc(this.data.preparation / 60);
      this.preparationSec = this.data.preparation %= 60
      this.timeMin = Math.trunc(this.data.time / 60);
      this.timeSec = this.data.time %= 60
      this.restRepsMin = Math.trunc(this.data.restReps / 60);
      this.restRepsSec = this.data.restReps %= 60
      this.restSetsMin = Math.trunc(this.data.restSets / 60);
      this.restSetsSec = this.data.restSets %= 60
      this.listId = this.data.list

    }
  }


  async createdItem(formItem: NgForm) {

    if (this.modeUpdate) {

      if (formItem.invalid) { return; }

      const update = await this.itemsService.updateItem(this.listId, this.data._id, this.item)

      if (update) {

        this.dialog.closeAll();
        this.clearItem();

      } else {
        alert('Error al actualizar lista')
      }

    } else {

      if (this.preparationMin != 0) {
        this.item.preparation = this.preparationSec + (this.preparationMin * 60);
      } else {
        this.item.preparation = this.preparationSec;
      }


      if (this.timeMin != 0) {
        this.item.time = this.timeSec + (this.timeMin * 60);
      } else {
        this.item.time = this.timeSec;
      }

      if (this.restRepsMin != 0) {
        this.item.restReps = this.restRepsSec + (this.restRepsMin * 60);
      } else {
        this.item.restReps = this.restRepsSec;
      }


      if (this.restSetsMin != 0) {
        this.item.restSets = this.restSetsSec + (this.restSetsMin * 60);
      } else {
        this.item.restSets = this.restSetsSec;
      }


      if (formItem.invalid) { return; }

      const valid = await this.itemsService.createdItem(this.listId, this.item);

      if (valid) {

        this.dialog.closeAll();
        this.clearItem();

      } else {
        alert('Error al crear lista')
      }

    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  // Limpiar el item
  clearItem() {
    this.item = {
      title: '',
      description: '',
      preparation: 0,
      sets: 0,
      time: 0,
      restSets: 0,
      repeats: 0,
      restReps: 0,
      list: ''
    }
  }


}
