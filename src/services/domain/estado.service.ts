import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDto } from "../../models/estado.dto";

@Injectable()
export class EstadoService {

    constructor(public http: HttpClient) {      
    }

    /*funcao tipada retornando lista de CategoriaDto*/
    findAll() : Observable<EstadoDto[]> {
        return this.http.get<EstadoDto[]>(`${API_CONFIG.baseUrl}/estados`);
    }
}