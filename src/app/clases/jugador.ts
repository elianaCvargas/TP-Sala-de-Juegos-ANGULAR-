export class Jugador {
  public nombre: string;
  public username: string;
  public password: string;

  constructor(nombre: string, username:string, password: string) {
    this.nombre = nombre;
    this.username =  username;
    this.password = password;
  }
}
