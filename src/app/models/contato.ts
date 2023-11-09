import { Pessoa } from "./pessoa";

export interface Contato {
  id?: any,
  telefone: String,
  email: String,
  pessoa?: Pessoa
}

