import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
/*
  Generated class for the CepProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CepProvider {
public webService = "https://viacep.com.br/ws/";
  constructor(public http: Http,
    private _platform: Platform
  ) {
  }

  //Retorna Endereco pelo cep(ViaCep) 
  getEndereco(selectedCep){
    return this.http.get(this.webService+selectedCep+"/json");
  }

}
