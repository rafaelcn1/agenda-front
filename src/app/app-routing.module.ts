import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaListComponent } from './components/pessoa/pessoa-list/pessoa-list.component';
import { ContatoCreateComponent } from './components/contato/contato-create/contato-create.component';
import { ContatoListComponent } from './components/contato/contato-list/contato-list.component';
import { NavComponent } from './components/nav/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/pessoa/login/login.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '',
    component: NavComponent, children: [
      {path: 'home',component: HomeComponent},
      {path: 'pessoas', component: PessoaListComponent},
      {path: 'contatos', component: ContatoListComponent}
    ]
  },
  // Outras rotas do seu aplicativo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
