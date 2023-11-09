import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Adicionado por fora
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ToastrModule } from 'ngx-toastr';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';


// Meus componentes
import { PessoaCreateComponent } from './components/pessoa/pessoa-create/pessoa-create.component';
import { PessoaListComponent } from './components/pessoa/pessoa-list/pessoa-list.component';
import { PessoaEditComponent } from './components/pessoa/pessoa-edit/pessoa-edit.component';
import { HomeComponent } from './components/home/home.component';
import { ContatoCreateComponent } from './components/contato/contato-create/contato-create.component';
import { ContatoListComponent } from './components/contato/contato-list/contato-list.component';
import { NavComponent } from './components/nav/nav/nav.component';
import { ContatoEditComponent } from './components/contato/contato-edit/contato-edit.component';
import { ContatoListIdComponent } from './components/contato/contato-list-id/contato-list-id.component';
import {MatSelectModule} from '@angular/material/select';
import { LoginComponent } from './components/pessoa/login/login.component';




@NgModule({
  declarations: [AppComponent, PessoaListComponent, PessoaCreateComponent, PessoaEditComponent, HomeComponent, ContatoCreateComponent, ContatoListComponent, NavComponent, ContatoEditComponent, ContatoListIdComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatSelectModule

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
