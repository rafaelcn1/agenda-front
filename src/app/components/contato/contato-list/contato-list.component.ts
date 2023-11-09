import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Contato } from 'src/app/models/contato';
import { ContatoService } from 'src/app/services/contato.service';
import { ContatoEditComponent } from '../contato-edit/contato-edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contato-list',
  templateUrl: './contato-list.component.html',
  styleUrls: ['./contato-list.component.css'],
})
export class ContatoListComponent implements OnInit {
  constructor(
    private service: ContatoService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarTodos();
  }

  ELEMENT_DATA: Contato[] = [];

  displayedColumns: string[] = ['id', 'Telefone', 'email', 'Pessoa', 'acoes'];

  dataSource = new MatTableDataSource<Contato>(this.ELEMENT_DATA);

  listarTodos() {
    this.service.listarTodos().subscribe((res) => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<Contato>(res);
    });
  }

  deletar(contato: Contato) {
    const confirmacao = window.confirm(
      `Deseja apagar o contato: ${contato.telefone}?`
    );
    if (confirmacao) {
      this.service.deletar(contato).subscribe((res) => {
        this.listarTodos();
      });
    }
  }

  openEditDialog(contato: Contato) {
    const dialogRef = this.dialog.open(ContatoEditComponent, {
      data: { contato: contato },
    });
    dialogRef.afterClosed().subscribe((result) => {
      //this.isDisabled = false;
    });
  }

}
