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
        if(position == -1) { //produto nao foi encontrado
            cart.items.push({quantidade: 1, produto: produto}); //push insere item
        }
        this.storage.setCart(cart);
        return cart;
    }

    removeProduto(produto: ProdutoDto) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id); 
        if(position != -1) { //produto foi encontrado
            cart.items.splice(position, 1); //splice remove item
        }
        this.storage.setCart(cart);
        return cart;
    }

    
    increaseQuantity(produto: ProdutoDto) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id); 
        if(position != -1) { //produto foi encontrado
            cart.items[position].quantidade++; //acessa a colecao de items na posicao position e incrementa quantidade do prod na posicao
        }
        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDto) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id); 
        if(position != -1) { //produto foi encontrado
            cart.items[position].quantidade--; //acessa a colecao de items na posicao position e decrementa quantidade do prod na posicao
            if(cart.items[position].quantidade < 1) {
                cart = this.removeProduto(produto); //se a quantidade for menor que zero, remove o produto
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    total() : number {
        let cart = this.getCart();
        let sum = 0; //inicia variavel soma comecando com zero
        /**
         * for para percorrer os items do carrinho
         * comeca variavel i com zero
         * o for avanca enquanto a variavel ir for menor que cart.items.length
         * para cada de valor de i, a soma recebe ela mesma + o preco do cart.items na posicao i * a quantidade do cart.items na posicao i 
         * quando o for acaba, retorna a soma
         */
        for (var i=0; i<cart.items.length; i++) {
            sum += cart.items[i].produto.preco * cart.items[i].quantidade;
        }
        return sum;
    }


}