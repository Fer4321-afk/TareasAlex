// Definir el enemigo
export class Enemigo {
  constructor(nombre, fuerza, energia, tipoataque) {
    this.nombre = nombre;
    this.fuerza = fuerza;
    this.energia = energia;
    this.tipoataque = tipoataque;
  }

  // funcion de movimiento
  mover() {
    if (this.energia > 0) {
      this.energia -= 10;
      alert(this.nombre + "Se mueve");
    } else {
      alert(this.nombre + "no se puede mover , esta cansado");
    }
  }

  atacar() {
    if (this.energia >= 10) {
      this.energia -= 10;
      if (tipo.tipoataque == "golpear") {
        alert(
          `${this.nombre} golpea e inflige ${this.fuerza} de daño. Energía restante: ${this.energia}`
        );
      } else if (tipo.tipoataque === "disparar") {
        alert(
          `${this.nombre} dispara e inflige ${this.fuerza} de daño. Energía restante: ${this.energia}`
        );
      } else {
        alert(
          `${this.nombre} intenta atacar, pero el tipo de ataque no existe.`
        );
      }
    } else {
      alert(`${this.nombre} está demasiado cansado para atacar.`);
    }
  }
}
//Añadirlos a la clase
let Orco = new Enemigo("Orco", 15, 20, "disparar");
let Troll = new Enemigo("Troll", 20, 20, "golpear");
//recorrer el arryse para gestionar
let enemigos = [Orco, Troll];
// Ejemplo de uso
enemigos[0].mover();
enemigos[0].atacar();
enemigos[1].atacar();
enemigos[1].mover();
