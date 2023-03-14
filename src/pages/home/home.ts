import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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
  this.navCtrl.setRoot('CategoriasPage');
}



}
