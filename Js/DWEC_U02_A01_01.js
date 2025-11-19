var a = 5; // Variable definida en el objeto global
var x = "hola"; // "var" permite redeclarar variables (aunque no es recomendable)

let b = 6; // Variable definida en el objeto global
let c = "hola"; // Error: Uncaught SyntaxError: Identifier 'b' has already been declared

function funcion1() {
  console.log(a); // Es correcto. Muestra "hola"
  console.log(b); // Es correcto. Muestra 6.

  var c = "hola"; // Variable definida en el ámbito de la funcion1

  for (let d = 0; d < 5; d++) {
    console.log(d); // d existe solo en este bloque
  }
  console.log(d); // Error: Uncaught ReferenceError: d is not defined

  for (var d1 = 0; d1 < 5; d1++) {
    console.log(d1); // d1 se crea en el ámbito de funcion1
  }
  console.log(d1); // Es correcto: "d1" está definida en el ámbito de "funcion1. Devuelve 5.

  if (true) {
    var e = 52;
    let f = 60;
  }

  console.log(e); // Es correcto: "e" está definida en el ámbito de funcion1
  console.log(f); // Error: "f" solo está definida en el bloque del "if"
}

console.log(c); // Uncaught ReferenceError: c is not defined (solo existe dentro de funcion1)

const g = 52;
g = "hola"; // Error: Uncaught TypeError: Assignment to constant variable.

const h = ["a", "b"];
h[0] = "d"; // Es correcto: "h" no se reasigna, sino que solo se cambia el primer elemento del array al que apunta
