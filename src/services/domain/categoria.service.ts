import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDto } from "../../models/categoria.dto";

@Injectable()
export class CategoriaService {

    constructor(public http: HttpClient) {      
    }

    /*funcao tipada retornando lista de CategoriaDto*/
    findAll() : Observable<CategoriaDto[]> {
        return this.http.get<CategoriaDto[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}