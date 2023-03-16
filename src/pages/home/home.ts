import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDto } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDto = {
    email: "",
    senha: ""
  };


  constructor(public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {

  }

/*Quando entrar na página, desabilita o menu*/
ionViewWillEnter() {
  this.menu.swipeEnable(false);
}

/*Quando sair da página, habilita o menu*/
ionViewDidLeave() {
  this.menu.swipeEnable(true);
}

ionViewDidEnter() {
  this.auth.refreshToken()
  .subscribe(response => {
    this.auth.successfullLogin(response.headers.get('Authorization'));
    this.navCtrl.setRoot('CategoriasPage');
  },
  error => {});
}

login() {
  this.auth.authenticate(this.creds)
    .subscribe(response => {
      this.auth.successfullLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
}

signup() {
  this.navCtrl.push('SignupPage');
}



}
