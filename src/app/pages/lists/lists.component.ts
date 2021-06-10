import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListsService } from 'src/app/shared/services/lists.service';
import { IList } from '../../interfaces/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { FormListsComponent } from '../../shared/forms/form-lists/form-lists.component';
import { UiService } from '../../shared/services/ui.service';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent {


  position: number;
  searchKey: string;

  dataSource: MatTableDataSource<IList>;
  lists: IList[] = [];
  columns: string[] = ['num', 'id', 'title', 'user', 'created', 'buttons'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor
    (
      private listsService: ListsService,
      private uiService: UiService,
      public dialog: MatDialog
    ) { }

  ngOnInit() {

    this.loadLists();

  }

  loadLists() {
    this.listsService.getAllLists()
      .subscribe(resp => {
        console.log(resp);
        this.lists.push(...resp.lists);
        this.dataSource = new MatTableDataSource(this.lists)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  search(ev: any) {
    const filter = (ev.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase()
  }



  deleteListDialog(listId: string) {

    const dialog = this.uiService.deleteRecordDialog
      (
        listId,
        '¿De verdad quieres eliminar este registro? este proceso no se puede deshacer.',
        'list',
        DeleteDialogComponent
      );
    dialog.afterClosed().subscribe(() => {

      this.lists = [];
      this.loadLists();

    });

  }

  addListDialog() {

    const dialogRef = this.dialog.open(FormListsComponent, {

    });

    dialogRef.afterClosed().subscribe(() => {

      this.lists = [];
      this.loadLists();

    });

  }

  editList(list: IList) {

    const dialogRef = this.dialog.open(FormListsComponent, {

      data: list
    });

    dialogRef.afterClosed().subscribe(() => {

      this.lists = [];
      this.loadLists();

    });

  }

}

