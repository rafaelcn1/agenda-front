import { Contato } from "./contato";

export interface Pessoa {
  id?: any;
  nome: string;
  dataNascimento: any;
  usuario: string;
  senha: string;
  contatos: Contato[];
  perfil: String;
}
