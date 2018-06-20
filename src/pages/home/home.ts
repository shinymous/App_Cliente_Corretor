import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClientListPage } from '../client-list/client-list';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public credentials={
    codigoSusep:'',
    senha:''
  };
  public s: boolean;

  constructor(public navCtrl: NavController,
              private alertController: AlertController,
              public authProvider: AuthProvider,
              private loadingCtrl: LoadingController
  ) {

  }

  // Direciona para pagina de Clientes cadastrados
  goToClientList(){
    this.navCtrl.push(ClientListPage);
  }

  // Verifica se o cliente está logado para apresentar a página ClientList
  login(){
    if(this.credentials.codigoSusep == "" || this.credentials.senha == ""){
        this.showNullAlert();
    }else{
    this.presentLoadingDefault();
    this.authProvider.toLogin(this.credentials, this.s);
    console.log(this.authProvider.toLogin(this.credentials, this.s));
    setTimeout(val => {
      if(this.authProvider.status==true){
      this.goToClientList();
    }else{
      this.showAlert();
    }
  }, 2000);
}

  }


  ionViewDidEnter(){
    this.credentials={codigoSusep:'', senha: ''};
    this.authProvider.logout();
  }

// ALERTAS E LOADING //
  showNullAlert(){
    const alert = this.alertController.create({
      title: 'Erro ao fazer Login!',
      subTitle: 'Código Susep ou Senha em branco!',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlert() {
    const alert = this.alertController.create({
      title: 'Erro ao fazer Login!',
      subTitle: 'Senha ou CódigoSusep incorretos',
      buttons: ['OK']
    });
    alert.present();
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }
}
