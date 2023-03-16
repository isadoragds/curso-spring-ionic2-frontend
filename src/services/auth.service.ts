import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDto } from "../models/credenciais.dto";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storage: StorageService){
    }

    authenticate(creds: CredenciaisDto){
        return this.http.post(`${API_CONFIG.baseUrl}/login`,
        creds,
        {
            observe: 'response',
            responseType: 'text'
        });
    }

    /**metodo para manter o usuario logado na tela - a url vem do AuthResource do backend */
    refreshToken(){
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`,
        {}, //resposta vazia, pois o token é incluido automaticamente na requisicao pelo auth-interceptor
        {
            observe: 'response',
            responseType: 'text'
        });
    }

    successfullLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7); /*corta a string a partir do caracter 7, pegando somente o token e não o Bearear junto*/
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub /**extrai o email do token */
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null); /**remove o usuario do storage */
    }
}