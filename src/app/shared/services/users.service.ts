import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRespUser, IUser } from '../../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  // Obtener todos los Usuarios

  getAllUsers() {
    return this.http.get<IRespUser>(`${URL}/user/all`)
  }




  createUser(user: IUser) {

    return new Promise((resolve) => {
      this.http.post<IRespUser>(`${URL}/user/create`, user)
        .subscribe(async resp => {
          console.log(resp);
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }


  // Actualizar usuario

  updateUser(userId: string, user: IUser) {
    return new Promise(resolve => {

      this.http.post<any>(`${URL}/lists/update/${userId}`, user)
        .subscribe(resp => {

          if (resp['ok']) {

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
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
}


