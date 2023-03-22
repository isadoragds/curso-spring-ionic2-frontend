import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDto } from "../../models/produto.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {
    }

    createOrClearCart () : Cart { //metodo retorna cart
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    //findindex é uma posicao do javascript pra achar a posicao do elemento. Recebe um predicado como um argumento
    //procura um produto na lista de intens de carrinho, o item cujo produto tenha o mesmo id do produto que se quer inserir 
    //se esse produto existir na lista, a posicao dele sera retornada, se nao,  por padrao, retorna-se o valor -1, adicionando-o
    addProduto(produto: ProdutoDto) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id); 
        if(position == -1) {
            cart.items.push({quantidade: 1, produto: produto}); //push insere item
        }
        this.storage.setCart(cart);
        return cart;
    }
}