import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDto } from '../../models/credenciais.dto';

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


  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

/*Quando entrar na página, desabilita o menu*/
ionViewWillEnter() {
  this.menu.swipeEnable(false);
}

/*Quando sair da página, habilita o menu*/
ionViewDidLeave() {
  this.menu.swipeEnable(true);
}

login() {
  console.log(this.creds);
  this.navCtrl.setRoot('CategoriasPage');
}



}
