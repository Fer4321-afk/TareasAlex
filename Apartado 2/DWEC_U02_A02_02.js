function confirmar(pregunta, si, no) {
    if (confirm(pregunta))
	si(); // Se ejecuta la función de callback pasada en el parámetro 'si'
    else
	no(); // Se ejecuta la función de callback pasada en el parámetro 'no'
}

function aceptar() {
    console.log("Has respondido que sí");
}

function cancelar() {
    console.log("Has respondido que no");
}

// Se pasan las funciones 'aceptar' y 'cancelar' como parámetros
// IMPORTANTE: se pasan los nombres de las funciones,
// no el resultado de su ejecución
// (Es decir, se pasa 'aceptar', no 'aceptar()'
confirmar("¿Sabes qué es un callback?", aceptar, cancelar);

// Si queremos hacer otro tipo de procesamiento podemos pasar otro callback a 'confirmar'
function aceptar2() {
    alert("Has respondido que sí");
}

confirmar("¿Sabes qué es un callback?", aceptar2, cancelar);
