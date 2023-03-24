import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDto } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

 
  items : ProdutoDto[] = []; //iniciando com a lista vazia -> sempre que buscar uma nova pagina, vai concatenar com a lista que ja existia
  page : number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id, this.page, 10) //busca produtos de 10 em 10
      .subscribe(response => {
        let start = this.items.length; //tamanho da lista 
        this.items = this.items.concat(response['content']);
        let end = this.items.length - 1; //se a listar for de 10 items, a posicao é de 0 a 9 (o fim sempre vai ser o tamanho da lista menos 1) 
        loader.dismiss();
        console.log(this.page);
        console.log(this.items);
        this.loadImageUrls(start, end); //com esses parametros, as imagens que nao existem nao vao ser carregadas novamente a medida que se concatena a lista de produtos
      },
      error => {
        loader.dismiss();
      });
  }

  loadImageUrls(start: number, end: number) {
    for (var i=start; i<=end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imgUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {});
    }
  }  

  showDetail(produto_id : string) {
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
  }

    presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader; //para ter acesso ao metodo depois para fechar o loading
  }

  doRefresh(refresher) {
    this.page = 0; 
    this.items = []; //quando der refresh tem que zerar a lista de produtos
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  
  doInfinite(infiniteScroll) {
    this.page++; //concatena a pagina
    this.loadData(); //exibe os dados
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
