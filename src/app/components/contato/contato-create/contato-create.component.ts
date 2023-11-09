import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Contato } from 'src/app/models/contato';
import { Pessoa } from 'src/app/models/pessoa';

@Component({
  selector: 'app-contato-create',
  templateUrl: './contato-create.component.html',
  styleUrls: ['./contato-create.component.css'],
})
export class ContatoCreateComponent {
  pessoa!: Pessoa; // Esta propriedade irá armazenar a pessoa
  constructor(public dialogRef: MatDialogRef<ContatoCreateComponent>) {}

  contato: Contato = {
    telefone: '',
    email: '',
    pessoa: this.pessoa,
  };

  addContato(): void {
    this.pessoa.contatos.push(this.contato);
    this.dialogRef.close(this.pessoa);
  }
}
