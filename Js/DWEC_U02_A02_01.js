let nombre1 = "Pedro"; // Variable global
let nombre2 = "Pablo"; // Variable global

function nombres() {
  let nombre3 = "Juan"; // Variable local
  let nombre2 = "Jorge"; // Variable local que enmascara la variable global 'nombre2'

  console.log(nombre1); // Pedro
  console.log(nombre2); // Jorge
  console.log(nombre3); // Juan
}

console.log(nombre1); // Pedro
console.log(nombre2); // Pablo
console.log(nombre3); // undefined
