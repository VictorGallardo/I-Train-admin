import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { FormItemsComponent } from 'src/app/shared/forms/form-items/form-items.component';
import { ItemsService } from 'src/app/shared/services/items.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { IItem } from '../../interfaces/interfaces';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {


  position: number;
  searchKey: string;

  dataSource: MatTableDataSource<IItem>;
  items: IItem[] = [];
  columns: string[] = ['num', 'id', 'title', 'description', 'created', 'buttons'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private itemsService: ItemsService,
    private uiService: UiService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemsService.getAllItems()
      .subscribe(resp => {
        console.log(resp);
        this.items.push(...resp.items);
        this.dataSource = new MatTableDataSource(this.items)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  search(ev: any) {
    const filter = (ev.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase()
  }

  deleteItemDialog(listId: string) {

    const dialog = this.uiService.deleteRecordDialog
      (
        listId,
        '¿De verdad quieres eliminar este registro? este proceso no se puede deshacer.',
        'item',
        DeleteDialogComponent
      );
    dialog.afterClosed().subscribe(() => {

      this.items = [];
      this.loadItems();

    });

  }

  addItemDialog() {

    const dialogRef = this.dialog.open(FormItemsComponent, {
    });

    dialogRef.afterClosed().subscribe(() => {

      this.items = [];
      this.loadItems();

    });

  }

  editItemDialog(item: IItem) {

    const dialogRef = this.dialog.open(FormItemsComponent, {

      data: item
    });

    dialogRef.afterClosed().subscribe(() => {

      this.items = [];
      this.loadItems();

    });

  }

}



