import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
/*
  Generated class for the ClienteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClienteProvider {
public webService = "http://localhost:8080/clientes";
public corretorList = new Array<any>();
  constructor(public http: Http,
    private _platform: Platform
  ){
  }

  //Retorna todos os clientes do WebService
  getClientes(){
    return this.http.get(this.webService);
  }
}
