import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contato } from 'src/app/models/contato';
import { Pessoa } from 'src/app/models/pessoa';
import { ContatoCreateComponent } from '../contato-create/contato-create.component';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-contato-edit',
  templateUrl: './contato-edit.component.html',
  styleUrls: ['./contato-edit.component.css'],
})
export class ContatoEditComponent {
  pessoa!: Pessoa; // Esta propriedade irá armazenar a pessoa
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ContatoCreateComponent>,
    private service: ContatoService
  ) {
    this.contato = data.contato;
  }

  contato: Contato = {
    telefone: '',
    email: '',
    pessoa: this.pessoa,
  };

  editar() {

    this.service.editar(this.contato).subscribe(() => {
      this.service.listarTodosPessoa(this.contato.id)
    });
  }
}
