import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { IRespUser, IUser } from '../../interfaces/interfaces';
import { UiService } from './ui.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  token: any = null;

  constructor(
    private http: HttpClient,
    private uiService: UiService,
    private cookies: CookieService,

  ) { }


  ngOnInit(): void {
  }

  // Obtener todos los Usuarios

  getAllUsers() {
    return this.http.get<IRespUser>(`${URL}/user/all`)
  }

  loadToken() {

    if (this.cookies.get('token')) {
      this.token = this.cookies.get('token');
    } else {
      this.token = '';
    }
  }


  // Crear Usuarios

  createUser(user: IUser) {

    return new Promise((resolve) => {
      this.http.post<IRespUser>(`${URL}/user/create`, user)
        .subscribe(async resp => {
          console.log(resp);
          if (resp['ok']) {
            this.uiService.openSnackBar('Usuario creado correctamente', 'OK')
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }



  // Actualizar usuario

  updateUser(userId: string, user: IUser) {

    this.loadToken();

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {

      this.http.post<any>(`${URL}/user/update/${userId}`, user, { headers })
        .subscribe(resp => {

          if (resp['ok']) {
            this.uiService.openSnackBar('Usuario actualizado correctamente', 'OK');
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });

  }

  // Eliminar usuario

  async deleteUser(userId: string) {
    return new Promise(resolve => {
      this.http.delete<any>(`${URL}/user/delete/${userId}`)
        .subscribe(resp => {

          if (resp['ok']) {
            this.uiService.openSnackBar('Uusuario eliminado correctamente', 'OK');
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
}


