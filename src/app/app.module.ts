import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import{ IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ClientListPageModule} from '../pages/client-list/client-list.module';
import { ClienteProvider } from '../providers/cliente/cliente';
import { CepProvider } from '../providers/cep/cep';
import { AuthProvider } from '../providers/auth/auth';
import { EnderecoPageModule } from '../pages/endereco/endereco.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    ClientListPageModule,
    IonicStorageModule.forRoot({name: '_mydb'}),
    EnderecoPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ClienteProvider,
    CepProvider,
    AuthProvider
  ]
})
export class AppModule {}
