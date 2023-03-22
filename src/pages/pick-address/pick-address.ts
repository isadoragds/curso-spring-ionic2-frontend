import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDto } from '../../models/endereco.dto';
import { PedidoDto } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDto[];

  pedido: PedidoDto;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos']; //campo do json do backend

          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: {id: response['id']},
            enderecoDeEntrega: null, //o endereco ainda nao foi escolhido
            pagamento: null, //nao foi escolhido ainda tambem
            itens : cart.items.map(x => {return {quantidade: x.quantidade, produto: {id: x.produto.id}}}) //o map percorre toda a lista, para cada elemento x a lista original vai ser transformada
            //funcao lambda que percorre a lista, convertendo para o objeto desejado (no caso, quantidade e id do produto)
          }
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage'); //quando ocorre erro 403, coloca redirecionamento para pagina inicial nesse controlador do perfil
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage'); //caso ocorra problema na obtencao do local user
    }
  }

  nextPage(item: EnderecoDto) {
    this.pedido.enderecoDeEntrega = {id: item.id};
    console.log(this.pedido);
  }

}
