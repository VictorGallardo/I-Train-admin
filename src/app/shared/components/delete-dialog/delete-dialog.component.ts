import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventsService } from '../../services/events.service';
import { ItemsService } from '../../services/items.service';
import { ListsService } from '../../services/lists.service';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(

    @Inject(MAT_DIALOG_DATA) public data: any,
    private listsService: ListsService,
    private itemsService: ItemsService,
    private eventsService: EventsService,
    private usersService: UsersService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    console.log(this.data.id);
  }

  deleteRecord() {

    const type = this.data.option;

    switch (type) {
      case 'user': {
        this.usersService.deleteUser(this.data.id);
        this.dialog.closeAll();
        break;
      }

      case 'list': {
        this.listsService.deleteList(this.data.id);
        this.dialog.closeAll();
        break;
      }
      case 'item': {
        this.itemsService.deleteItem(this.data.id);
        this.dialog.closeAll();
        break;
      }
      case 'event': {
        this.eventsService.deleteEvent(this.data.id);
        this.dialog.closeAll();
        break;
      }

      default: {
        break;
      }

    }

  }

  closeDialog() {
    this.dialog.closeAll();
  }


}
