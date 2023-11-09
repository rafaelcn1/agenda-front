import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Contato } from 'src/app/models/contato';
import { ContatoService } from 'src/app/services/contato.service';
import { ContatoEditComponent } from '../contato-edit/contato-edit.component';

@Component({
  selector: 'app-contato-list-id',
  templateUrl: './contato-list-id.component.html',
  styleUrls: ['./contato-list-id.component.css'],
})
export class ContatoListIdComponent implements OnInit {
  idPessoa: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ContatoService,
    public dialog: MatDialog
  ) {
    this.idPessoa = data.pessoa.id;
  }

  ngOnInit(): void {
    if (this.idPessoa) {
      this.listarTodosPessoa(this.idPessoa);
    }
  }

  ELEMENT_DATA: Contato[] = [];

  displayedColumns: string[] = ['Telefone', 'email', 'Pessoa', 'acoes'];

  dataSource = new MatTableDataSource<Contato>(this.ELEMENT_DATA);

  listarTodosPessoa(id: number) {
    this.service.listarTodosPessoa(id).subscribe((res) => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<Contato>(res);
    });
  }

  deletar(contato: Contato) {
    const confirmacao = window.confirm(
      `Deseja apagar o contato: ${contato.telefone}?`
    );
    if (confirmacao) {
      this.service.deletar(contato).subscribe((result) => {
        this.listarTodosPessoa(this.idPessoa);
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
