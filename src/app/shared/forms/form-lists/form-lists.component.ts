import { Component, Inject, OnInit } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-lists',
  templateUrl: './form-lists.component.html',
  styleUrls: ['./form-lists.component.scss']
})
export class FormListsComponent implements OnInit {


  switchOn: boolean;
  modeUpdate: boolean;

  list = {
    title: '',
  }

  constructor
    (
      @Inject(MAT_DIALOG_DATA) public data: any,
      private listsService: ListsService,
      public dialog: MatDialog
    ) { }

  ngOnInit(): void {

    if (this.data) {

      this.modeUpdate = true;
      this.list.title = this.data.title
    }

  }


  switch() {

    if (this.switchOn) {
      this.switchOn = false
    } else {
      this.switchOn = true
    }

  }


  async createdList(formList: NgForm) {

    if (this.modeUpdate) {

      if (formList.invalid) { return; }

      const update = await this.listsService.updateList(this.data._id, this.list)

      if (update) {

        this.dialog.closeAll();

        this.list = {
          title: ''
        }

      } else {
        alert('Error al actualizar lista')
      }

    } else {

      if (formList.invalid) { return; }

      const valid = await this.listsService.createdList(this.list);

      if (valid) {

        this.dialog.closeAll();

        this.list = {
          title: ''
        }

      } else {
        alert('Error al crear lista')
      }

    }
  }

  closeList() {

    this.dialog.closeAll();


  }
}
