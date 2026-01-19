// lista donde voy guardando los gastos
let listaGastos = [];

// creo un gasto
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
  return {
    id: crypto.randomUUID(),
    descripcion,
    valor,
    fecha: fecha || new Date().toISOString().split("T")[0],
    etiquetas: etiquetas || [],
  };
}

// añado el gasto a la lista
function anyadirGasto(gasto) {
  listaGastos.push(gasto);
}

// devuelvo copia de los gastos
function listarGastos() {
  return [...listaGastos];
}

// borro un gasto segun su id
function borrarGasto(id) {
  listaGastos = listaGastos.filter((g) => g.id !== id);
}

// total de € gastado
function calcularTotalGastos() {
  return listaGastos.reduce((total, g) => total + g.valor, 0);
}

// funcion q pide el ejercicio: machacar la lista entera con otra
function sobrescribirGastos(nuevaLista) {
  listaGastos = nuevaLista;
}
