import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl =  environment.baseUrl;

  authUrl: string = '/auth/';

  private _user: any = null;

  get user() {
    return this._user;
  }

  constructor(private httpClient: HttpClient) {}

  login(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl+this.authUrl + 'login', data).pipe(
      tap((res) => {
        //el tap solo hace una validacion, solo es para poder añadir el token al user
        //console.log(res);
        if (res.ok === true) {
          this._user = {
            id: res.id,
            username: res.username,
            token: res.token,
          };
        } else {
          this._user = null;
        }
      }),
      map((res) => {
        //es el que retorna
        //console.log(res.ok)
        return res.ok; //aca me retorna el rest ok si todo se cumple
      }),
      catchError((err) => of(err.error.msg)) //esto capruta el mensaje de rror y lo retorna
    );
  }


  //Esto es para los Guards - CanActivate
  validarToken(): Observable<boolean> {

    const token = JSON.parse(localStorage.getItem("user")!);

    if (token) {
      return new Observable((subscriber) => {
        subscriber.next(true);
      });
    } else {
      return new Observable((subscriber) => {
        subscriber.next(false);
      });
    }
  }


  register(data: any){
    return this.httpClient.post<any>(this.baseUrl+this.authUrl + 'register', data).pipe(
      tap((res) => {
        //el tap solo hace una validacion, solo es para poder añadir el token al user
        //console.log(res);
        if (res.ok === true) {
          this._user = {
            id: res.id,
            username: res.username,
            token: res.token,
          };
        } else {
          this._user = null;
        }
      }),
      map((res) => {
        //es el que retorna
        //console.log(res.ok)
        return res.ok; //aca me retorna el rest ok si todo se cumple
      }),
      catchError((err) => of(err.error.msg)) //esto capruta el mensaje de rror y lo retorna
    );
  }
}
