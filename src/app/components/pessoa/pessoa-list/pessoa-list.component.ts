import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PessoaCreateComponent } from '../pessoa-create/pessoa-create.component';
import { PessoaEditComponent } from '../pessoa-edit/pessoa-edit.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ContatoListComponent } from '../../contato/contato-list/contato-list.component';
import { ContatoListIdComponent } from '../../contato/contato-list-id/contato-list-id.component';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css'],
})
export class PessoaListComponent implements OnInit {
  isDisabled: boolean = false;
  ELEMENT_DATA: Pessoa[] = [];

  displayedColumns: string[] = [
    'id',
    'nome',
    'dataNascimento',
    'usuario',
    'acoes',
  ];

  dataSource = new MatTableDataSource<Pessoa>(this.ELEMENT_DATA);

  constructor(
    private service: PessoaService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.listarTodos();
  }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    this.service.listarTodos().subscribe((res) => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<Pessoa>(res);
    });
  }

  openDialog() {
    this.isDisabled = true;
    const dialogRef = this.dialog.open(PessoaCreateComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.isDisabled = false;
    });
  }

  openEditDialog(pessoa: Pessoa) {
    this.isDisabled = true;
    const dialogRef = this.dialog.open(PessoaEditComponent, {
      data: { pessoa: pessoa },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.isDisabled = false;
    });
  }

  deletar(pessoa: Pessoa) {
    const confirmacao = window.confirm(
      `Deseja apagar o usuário: ${pessoa.usuario}?`
    );
    if (confirmacao) {
      this.service.deletar(pessoa).subscribe(() => {
        //this.toastr.success("Pessoa deletada com sucesso!", "Deletado");
        this.listarTodos();
      });
    }
  }

  visualizarContatos(pessoa: Pessoa){
    this.isDisabled = true;
    const dialogRef = this.dialog.open(ContatoListIdComponent, {
      data: { pessoa: pessoa },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.isDisabled = false;
    });
  }
}
