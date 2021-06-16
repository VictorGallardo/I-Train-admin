import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { IRespEvent, IEvent } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  newEvent = new EventEmitter<IEvent>();

  constructor
    (
      private http: HttpClient,
      private userService: AuthService
    ) { }

  // Obtener eventos
  getEvents() {

    const headers = new HttpHeaders({
      'x-token': this.userService.token // Traemos el token del userService
    });

    return this.http.get<IRespEvent>(`${URL}/events/all`, { headers }); // Hay que pasarle el header aqui IMPORTANTE!!
  }


  // Crear eventos
  createdEvent(event: any) {

    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise(resolve => {

      this.http.post<any>(`${URL}/events`, event, { headers })
        .subscribe(resp => {
          this.newEvent.emit(resp['event']);
          resolve(true);
        });

    });

  }


  // Editar evento
  editEvent(eventId: string, event: any) {

    return new Promise(resolve => {
      this.http.post<IRespEvent>(`${URL}/events/update/${eventId}`, event)
        .subscribe(resp => {

          if (resp['ok']) {
            resolve(true);
            console.log('Evento actualizado correctamente');
            console.log(resp)
          } else {
            resolve(false);
            console.error('Error al actualizar Evento');

          }
        });
    });
  }


  // Eliminar evento
  deleteEvent(eventId: string) {

    return new Promise(resolve => {
      this.http.delete<IRespEvent>(`${URL}/events/delete/${eventId}`)
        .subscribe(resp => {

          if (resp['ok']) {
            resolve(true);
            console.log('Evento eliminado correctamente');
            console.log(resp)
          } else {
            resolve(false);
            console.error('Error al eliminar evento');

          }
        });
    });

  }
}
