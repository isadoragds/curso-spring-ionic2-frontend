import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDto } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDto;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.item = {
      id: "1",
      nome: "mouse",
      preco: 80.59
    }
  }

}
