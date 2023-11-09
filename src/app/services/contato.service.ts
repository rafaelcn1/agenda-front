import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { Contato } from '../models/contato';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  constructor(private http: HttpClient) {}
  private url: string = API_CONFIG.baseUrl + '/contatos';

  salvar(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.url, contato);
  }

  listarTodos(): Observable<Contato[]>{
    return this.http.get<Contato[]>(this.url)
  }

  listarTodosPessoa(id: number): Observable<Contato[]>{
    return this.http.get<Contato[]>(this.url + '/pessoa/' + id)
  }

  deletar(contato: Contato): Observable<Contato>{
    return this.http.delete<Contato>(this.url + "/" + contato.id)
  }

  editar(contato: Contato): Observable<Contato>{
    return this.http.put<Contato>(this.url, contato);
  }

  findById(id: number): Observable<Contato>{
    return this.http.get<Contato>(this.url + "/" + id)
  }
}
