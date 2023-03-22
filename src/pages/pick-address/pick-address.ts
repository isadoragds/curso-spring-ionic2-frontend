import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDto } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDto[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos']; //campo do json do backend
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

}
