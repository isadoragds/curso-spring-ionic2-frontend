import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDto } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl; 

  items: CategoriaDto[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe(response => { /**arrow function - funcao com argumento (a funcao é declarada dentro do argumento de outra funcao)-> para chamar a resposta e imprimir na tela */
        this.items = response;
      },
      error => {}); 

  }

  showProdutos(categoria_id) {
    this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});
  }
}
