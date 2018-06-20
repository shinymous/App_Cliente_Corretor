import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { CepProvider } from '../../providers/cep/cep';
import { AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EnderecoPage } from '../endereco/endereco';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the ClientListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-list',
  templateUrl: 'client-list.html',
  providers: [ClienteProvider, CepProvider, AuthProvider]
})
export class ClientListPage {
  public clientList = new Array<any>();
  public corretor;
  public endereco = {"cep": "80420-000",
  "logradouro": "Rua Comendador Araújo",
  "complemento": "",
  "bairro": "Centro",
  "localidade": "Curitiba",
  "uf": "PR",
  "unidade": "",
  "ibge": "4106902",
  "gia": ""
}
  public clientSort = new Array<any>();
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private clienteProvider: ClienteProvider,
     private cepProvider: CepProvider,
     private alertController: AlertController,
     public authProvider: AuthProvider,
     public loadingCtrl: LoadingController
 ) {
  }

  // Subtrai o cep (primeiros 5 dígitos) do corretor com o cep do cliente
  subtractFunction(){
    for(let i = 0; i < this.clientList.length; i++){
          let cepFormatado = this.clientList[i].cep.substr(0,5);
          let corretorCepFormatado = this.corretor.cep.substr(0,5);
          let res = corretorCepFormatado - cepFormatado;
          this.clientSort.push(this.clientList[i]);
          this.clientSort[i].cepSubtracted = res;
    }

  }

  // Apresenta os dados do cliente selecionado
  lookForClient(client){
    this.cepProvider.getEndereco(this.corretor.cep).subscribe(data => {
      let retorno = (data as any)._body;
      let enderecoRetorno = JSON.parse(retorno);
      this.corretor.uf = enderecoRetorno.uf;
      this.compareUf(client, this.corretor.uf);
    });
  }

  // Compara os estados do corretor e cliente
  compareUf(client, corretorUf){
    this.cepProvider.getEndereco(client.cep).subscribe(data=>{
      let retorno = (data as any)._body;
      let enderecoRetorno = JSON.parse(retorno);
      client.endereco = enderecoRetorno;
      if(corretorUf != enderecoRetorno.uf){
        this.showAlert();
      }else{
      this.navCtrl.push(EnderecoPage, { client: client});
    }
    });
  }

  // Retorna o endereço do cliente
  getEndereco(){
    for(let i = 0; i < this.clientList.length; i++){
      this.cepProvider.getEndereco(this.clientList[i].cep)
      .subscribe(data=>{
        let retorno = (data as any)._body;
        this.endereco = (JSON.parse(retorno));
        this.clientList[i].uf = this.endereco.uf;
      });
    }
  }

  ionViewDidLoad(){
    this.authProvider.storage.get('user').then((val) => {
      console.log(val);
      this.corretor = val;
  });
    this.clienteProvider.getClientes().subscribe(data => {
    let retorno = (data as any)._body;
    this.clientList = JSON.parse(retorno);
    this.getEndereco();
    this.subtractFunction();
    this.clientSort.sort((obj1, obj2) => {
    let distance1 = Math.abs(obj1.cepSubtracted);
    let distance2 = Math.abs(obj2.cepSubtracted);
    return distance1 == distance2 ? 0 : (distance1 > distance2 ? 1 : -1);
});
    }, error => {
    });
  }

  ionViewDidEnter(){

  }

  // ALERTAS E LOADING
  showAlert() {
  const alert = this.alertController.create({
      title: 'Erro ao fazer atendimento',
      subTitle: 'Cliente UF diferente',
      buttons: ['OK']
    });
    alert.present();
  }

  corretorLogout() {
  let alert = this.alertController.create({
    title: 'Sair',
    message: 'Deseja encerrar sessão?',
    buttons: [
      {
        text: 'Não',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Sim',
        handler: () => {
          this.navCtrl.push(HomePage);
        }
      }
    ]
  });
  alert.present();
}

presentLoadingDefault() {
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 5000);
}
}
