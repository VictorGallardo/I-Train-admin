import { Component, ViewChild, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IList, IUser } from '../../interfaces/interfaces';
import { UsersService } from '../../shared/services/users.service';
import { UiService } from '../../shared/services/ui.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormUsersComponent } from 'src/app/shared/forms/form-users/form-users.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

})
export class UsersComponent implements OnInit {


  position: number;
  searchKey: string;

  dataSource: MatTableDataSource<IUser>;
  users: IUser[] = [];
  columns: string[] = ['num', 'id', 'email', 'name', 'role', 'buttons'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private usersService: UsersService,
    private uiService: UiService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {

    this.loadUsers();

  }

  loadUsers() {
    this.usersService.getAllUsers()
      .subscribe(resp => {
        console.log(resp);
        this.users.push(...resp.users);
        this.dataSource = new MatTableDataSource(this.users)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  search(ev: any) {
    const filter = (ev.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase()
  }

  deleteUserDialog(userId: string) {

    const dialog = this.uiService.deleteRecordDialog
      (
        userId,
        '¿De verdad quieres eliminar este registro? este proceso no se puede deshacer.',
        'user',
        DeleteDialogComponent
      );
    dialog.afterClosed().subscribe(() => {

      this.users = [];
      this.loadUsers();

    });

  }

  addUserDialog() {

    const dialogRef = this.dialog.open(FormUsersComponent, {

    });

    dialogRef.afterClosed().subscribe(() => {

      this.users = [];
      this.loadUsers();

    });

  }

  editUser(user: IUser) {

    const dialogRef = this.dialog.open(FormUsersComponent, {

      data: user
    });

    dialogRef.afterClosed().subscribe(() => {

      this.users = [];
      this.loadUsers();

    });

  }

}







