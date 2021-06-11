import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {

  modeUpdate: boolean;
  switchOn: boolean = false;
  roleUser: string
  password1: string;
  password2: string;
  passCheck: boolean;

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
  ) { }

  ngOnInit(): void {

    if (this.data) {

      this.modeUpdate = true;
      this.user = this.data;
      this.roleUser = this.data.role;

    }
  }

  switch() {

    if (this.switchOn) {
      this.switchOn = false
    } else {
      this.switchOn = true
    }

  }

  checkPassword() {

    this.password1
    this.password2

    if (this.password1 == '') {

      alert("Please enter Password");
    } else if (this.password2 == '') {

      alert("Please enter confirm password");

    } else if (this.password1 != this.password2) {

      alert("\nLas contraseñas no coinciden: Por favor vuelva a intentarlo.");

      this.passCheck = false;

    } else {

      this.passCheck = true;

    }
  }


  async createdUser(formUser: NgForm) {

    if (this.modeUpdate) {

      this.user.role = this.roleUser;

      if (this.switchOn) {

        this.checkPassword();

        if (this.passCheck) {

          this.user.password = this.password1;
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
            alert('Error al actualizar usuario')
          }
        }

      } else {
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
          alert('Error al actualizar usuario')
        }

      }

    } else {

      this.checkPassword();

      if (formUser.invalid) { return; }

      if (this.passCheck) {
        this.user.password = this.password1;
        this.user.role = this.roleUser;
      }
      const valid = await this.usersService.createUser(this.user);

      if (valid) {

        this.dialog.closeAll();
        this.user = {
          name: '',
          email: '',
          password: '',
          role: ''
        }

      } else {
        alert('Error al crear usuario')
      }

    }
  }

  closeUser() {

    this.modeUpdate = false;
    this.dialog.closeAll();


  }

}

