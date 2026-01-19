// lista donde voy guardando los gastos
let listaGastos = [];

// creo un gasto, asi tal cual, sin cosas raras
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
  return {
    id: crypto.randomUUID(), // id pa poder borrar
    descripcion,
    valor,
    fecha,
    etiquetas: etiquetas || [],
  };
}

// añado el gasto a la lista
function anyadirGasto(gasto) {
  listaGastos.push(gasto);
}

// devuelvo copia de los gastos (por si acaso)
function listarGastos() {
  return [...listaGastos];
}

// borro un gasto segun su id
function borrarGasto(id) {
  listaGastos = listaGastos.filter((g) => g.id !== id);
}

// total de € gastado
function calcularTotalGastos() {
  let total = 0;
  for (let g of listaGastos) total += g.valor;
  return total;
}

// funcion q pide el ejercicio: machacar la lista entera con otra
function sobrescribirGastos(nuevaLista) {
  listaGastos = nuevaLista;
}

/* cambio de repositorio */
