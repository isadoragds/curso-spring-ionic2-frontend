import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDto } from "../../models/cidade.dto";

@Injectable()
export class CidadeService {

    constructor(public http: HttpClient) {      
    }

    /*funcao tipada retornando lista de CategoriaDto*/
    findAll(estado_id : string) : Observable<CidadeDto[]> {
        return this.http.get<CidadeDto[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);
    }
}