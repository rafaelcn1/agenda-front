import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { parse } from 'date-fns'; // Importe as funções parse e format
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';
import { ToastrService } from 'ngx-toastr';
import { ContatoCreateComponent } from '../../contato/contato-create/contato-create.component';
import { ContatoService } from 'src/app/services/contato.service';
import { Contato } from 'src/app/models/contato';

@Component({
  selector: 'app-pessoa-edit',
  templateUrl: './pessoa-edit.component.html',
  styleUrls: ['./pessoa-edit.component.css'],
})
export class PessoaEditComponent implements OnInit {
  selectedDate!: Date; // Variável para armazenar a data de nascimento da pessoa

  isDisabled: boolean = false;
  qtdContato!: number;
  contatos!: Contato[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: PessoaService,
    private serviceContato: ContatoService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.pessoa = data.pessoa;
    this.selectedDate = this.parseDate(data.pessoa.dataNascimento);
  }

  listarTodosContatosPorPessoa() {
    this.serviceContato
      .listarTodosPessoa(this.pessoa.id)
      .subscribe((resposta) => {
        this.pessoa.contatos = resposta;
        this.qtdContato = this.pessoa.contatos.length;
      });
  }

  // Use a função parse para converter a string em um objeto Date
  parseDate(dateString: string): Date {
    return parse(dateString, 'dd/MM/yyyy', new Date());
  }

  formatarData(data: Date): string {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    } as const;
    return data.toLocaleDateString('pt-BR', options);
  }

  ngOnInit(): void {
    this.listarTodosContatosPorPessoa();
  }

  pessoa: Pessoa = {
    nome: '',
    dataNascimento: '',
    usuario: '',
    senha: '',
    contatos: [],
    perfil: ''
  };

  /*editar() {
    // Atualizar a nova data
    this.pessoa.dataNascimento = this.formatarData(this.selectedDate);
    this.pessoa.contatos.forEach((contato) => {
      //if (!(typeof contato.pessoa === 'undefined')) {
        this.service.editar(this.pessoa).subscribe((resposta) => {
          //this.pessoa.contatos = contatos; //Para evitar criar contatos duplicados sem pessoa
          this.contatos.forEach((element) => {
            if (!(typeof element.id === 'undefined')) {
              console.log("ID: " + element.id + "Pessoa: " + element.pessoa);

              element.pessoa = resposta;
              this.serviceContato
                .salvar(element)
                .subscribe((respostaContato) => {});
            }
          });
        });
      })
   // });
  }*/

  editar() {
    // Atualizar a nova data
    this.pessoa.dataNascimento = this.formatarData(this.selectedDate);
    this.pessoa.contatos.forEach((contato) => {
      this.pessoa.contatos = [];
      contato.pessoa = this.pessoa;
      if (typeof contato.id === 'undefined') {
        this.serviceContato.salvar(contato).subscribe((respostaContato) => {});
      }
    });
    this.service.editar(this.pessoa).subscribe((resposta) => {})

  }

  openDialogContato() {
    this.isDisabled = true;
    const dialogRef = this.dialog.open(ContatoCreateComponent);
    //this.pessoa.contatos = this.contatos;
    dialogRef.componentInstance.pessoa = this.pessoa;
    dialogRef.afterClosed().subscribe((_result) => {
      this.isDisabled = false;
      this.qtdContato = this.pessoa.contatos.length;
    });
  }
}
