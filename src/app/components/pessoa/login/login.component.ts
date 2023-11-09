import { Component } from '@angular/core';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private service: PessoaService) {}

  pessoa: Pessoa = {
    nome: '',
    dataNascimento: '',
    usuario: '',
    senha: '',
    contatos: [],
    perfil: '',
  };

  login(): void {
    this.service.login(this.pessoa);
  }
}
