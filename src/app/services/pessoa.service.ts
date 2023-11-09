import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  constructor(private http: HttpClient) {}
  private url: string = API_CONFIG.baseUrl + '/pessoas';

  listarTodos(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.url);
  }

  salvar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.url, pessoa);
  }

  findById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(this.url + '/' + id);
  }

  editar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(this.url, pessoa);
  }

  deletar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.delete<Pessoa>(this.url + '/' + pessoa.id);
  }

  login(pessoa: Pessoa) {

    return this.http
      .post(this.url + '/login', pessoa)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
