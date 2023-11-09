import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';
import { ContatoCreateComponent } from '../../contato/contato-create/contato-create.component';
import { MatDialog } from '@angular/material/dialog';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-pessoa-create',
  templateUrl: './pessoa-create.component.html',
  styleUrls: ['./pessoa-create.component.css'],
})
export class PessoaCreateComponent {
  isDisabled: boolean = false;

  qtdContato = 0;

  constructor(
    private service: PessoaService,
    private serviceContato: ContatoService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  pessoa: Pessoa = {
    nome: '',
    dataNascimento: '',
    usuario: '',
    senha: '',
    contatos: [],
    perfil: ''
  };

  formatarData(data: Date): string {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    } as const;
    return data.toLocaleDateString('pt-BR', options);
  }

  salvar(): void {
    console.log(this.pessoa);

    this.pessoa.dataNascimento = this.formatarData(this.pessoa.dataNascimento);
    const contatos = this.pessoa.contatos; //Para evitar criar contatos duplicados sem pessoa
    this.pessoa.contatos = [];
    this.service.salvar(this.pessoa).subscribe((resposta) => {
      this.pessoa.contatos = contatos; //Para evitar criar contatos duplicados sem pessoa
      this.pessoa.contatos.forEach((contato) => {
        contato.pessoa = resposta;
        this.serviceContato.salvar(contato).subscribe((respostaContato) => {});
      });
    });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/pessoas']);
    }); //esta função irá redirecionar para uma rota fictícia e retornar rapidamente à rota de destino sem que o usuário perceba.
  }

  openDialogContato() {
    this.isDisabled = true;
    const dialogRef = this.dialog.open(ContatoCreateComponent);
    dialogRef.componentInstance.pessoa = this.pessoa;
    dialogRef.afterClosed().subscribe((_result) => {
      this.isDisabled = false;
      this.qtdContato = this.pessoa.contatos.length;
    });
  }

  showPassword: boolean = false;

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

}
