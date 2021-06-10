import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UiService } from '../../services/ui.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {

  modeUpdate: boolean;

  roleUser: string

  user = {
    name: '',
    email: '',
    password: '',
    role: ''
  }

  constructor
    (
      @Inject(MAT_DIALOG_DATA) public data: any,
      private usersService: UsersService,
      public dialog: MatDialog,
      private uiService: UiService
    ) { }

  ngOnInit(): void {
  }


  async createdUser(formUser: NgForm) {

    if (this.modeUpdate) {

      if (formUser.invalid) { return; }

      const update = await this.usersService.updateUser(this.data._id, this.user)

      if (update) {

        this.dialog.closeAll();

        this.user = {
          name: '',
          email: '',
          password: '',
          role: ''
        }

      } else {
        alert('Error al actualizar lista')
      }

    } else {

      this.user.role = this.roleUser;

      if (formUser.invalid) { return; }

      const valid = await this.usersService.createUser(this.user);

      if (valid) {

        console.log(this.user);
        this.dialog.closeAll();
        this.user = {
          name: '',
          email: '',
          password: '',
          role: ''
        }

      } else {
        alert('Error al crear lista')
      }

    }
  }

  closeUser() {

    this.dialog.closeAll();


  }

}
