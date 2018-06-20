import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { CepProvider} from '../cep/cep';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public corretorList;
  public corretor={id:0, nome:"", cep:"", senha:"", codigoSusep:"", endereco:{logradouro:"", cep:"", localidade:"", complemento:"", bairro:""}};
  public endereco;
  public status = true;
  public webService = "http://localhost:8080/corretores/cod/";
  constructor(public http: HttpClient,
    private alertController: AlertController,
    public storage: Storage,
    public cepProvider: CepProvider
  ) {
    console.log('Hello AuthProvider Provider');
  }

  // Valida o login, pelo código susep e senha
  toLogin(credentials, s){
    this.http.get(this.webService+credentials.codigoSusep)
    .subscribe(data => {
      this.corretorList = data[0];
      if(typeof data[0] == "undefined"){
        return false;
      }
      if(credentials.senha == this.corretorList.senha){
        console.log("CREDENTIAL: "+ credentials.senha);
        this.status = true;
        // Insere no armazenamento local
        this.storage.set('user', this.corretorList);
        this.userIsLogged();
        return s = true;
      }else{
          return false;
        }
    }, error => {
    });
    }

    //  Realiza o logout, removendo o user do armazenamento local
    logout(){
    this.storage.remove('user');
    this.status = false;
  }
  //  Verifica se o cliente está logado
  userIsLogged(){
    return this.storage.get('user').then(val => {
      if(val == null){
        this.status = false;
        return false;
      }else{
        this.corretor = val;
        this.status = true;
        return true;
      }
    });
  }
}
