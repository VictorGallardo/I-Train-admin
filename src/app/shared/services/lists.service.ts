import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRespList, IList } from '../../interfaces/interfaces';
import { AuthService } from './auth.service';
import { UiService } from './ui.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ListsService {


  constructor
    (
      private http: HttpClient,
      private authService: AuthService,
      private uiService: UiService
    ) { }

  // Obtener todas las listas

  getAllLists() {
    return this.http.get<IRespList>(`${URL}/lists/all`)
  }


  // Eliminar lista

  deleteList(listId: string) {
    return new Promise(resolve => {
      this.http.delete<any>(`${URL}/lists/delete/${listId}`)
        .subscribe(resp => {

          if (resp['ok']) {
            resolve(true);
            this.uiService.openSnackBar('Lista eliminada correctamente', 'OK');
            console.log(resp)
          } else {
            resolve(false);
            this.uiService.openSnackBar('Error al eliminar lista', 'OK');
          }
        });
    });
  }


  // Crear listas

  createdList(list: IList) {

    const headers = new HttpHeaders({
      'x-token': this.authService.token
    });

    return new Promise(resolve => {

      this.http.post<any>(`${URL}/lists`, list, { headers })
        .subscribe(resp => {

          if (resp['ok']) {
            resolve(true);
            this.uiService.openSnackBar('Lista creada correctamente', 'OK');
          } else {
            resolve(false);
            this.uiService.openSnackBar('Error al crear lista', 'OK');

          }

        });

    });
  }


  // Actualizar listas

  updateList(listId: string, list: IList) {
    return new Promise(resolve => {

      this.http.post<any>(`${URL}/lists/update/${listId}`, list)
        .subscribe(resp => {

          if (resp['ok']) {

            resolve(true);
            this.uiService.openSnackBar('Lista actualizada correctamente', 'OK');

          } else {

            resolve(false);
            this.uiService.openSnackBar('Error al actualizaar lista', 'OK');

          }
        });
    });

  }

}
