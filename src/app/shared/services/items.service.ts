import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IItem, IRespItem } from '../../interfaces/interfaces';
import { UiService } from './ui.service';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private http: HttpClient,
    private uiService: UiService
  ) { }


  // Obtener todos los items

  getAllItems() {
    return this.http.get<IRespItem>(`${URL}/items/all`)
  }


  // Crear Item

  async createdItem(listId: string, item: any) {

    return new Promise(resolve => {

      this.http.post<any>(`${URL}/items/${listId}`, item) // Ruta al server, para crear items
        .subscribe(resp => {

          if (resp['ok']) {
            resolve(true);
            this.uiService.openSnackBar('Item creado correctamente', 'OK');
          } else {
            resolve(false);
            this.uiService.openSnackBar('Error al crear item', 'OK');
          }

        });

    });

  }


  // Actualizar items

  async updateItem(listId: string, itemId: string, item: IItem) {

    return new Promise(resolve => {
      this.http.post<any>(`${URL}/items/update/${listId}/${itemId}`, item)
        .subscribe(resp => {

          if (resp['ok']) {
            resolve(true);
            this.uiService.openSnackBar('Item actualizado correctamente', 'OK');
          } else {
            resolve(false);
            this.uiService.openSnackBar('Error al actualizar item', 'OK');
          }
        });
    });

  }

  // Eliminar Item

  async deleteItem(itemId: string) {
    return new Promise(resolve => {
      this.http.delete<IRespItem>(`${URL}/items/delete/${itemId}`)
        .subscribe(resp => {

          if (resp['ok']) {
            resolve(true);
            this.uiService.openSnackBar('Item eliminado correctamente', 'OK');
          } else {
            resolve(false);
            this.uiService.openSnackBar('Error al eliminar item', 'OK');
          }
        });
    });
  }

  // Eliminar Items cuando se borra una lista

  async deleteItemsList(listId: string) {
    return new Promise(resolve => {
      this.http.delete<IRespItem>(`${URL}/items/delete/items/${listId}`)
        .subscribe(resp => {

          if (resp['ok']) {
            resolve(true);
            console.log('Items eliminados correctamente');
            console.log(resp)
          } else {
            resolve(false);
            console.error('Error al eliminar items');

          }
        });
    });
  }

}
