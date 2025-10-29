// Variable global del presupuesto
let presupuesto = 0;

// Función para cambiar el presupuesto
function actualizarPresupuesto(nuevoPresupuesto) {
  if (typeof nuevoPresupuesto === "number" && nuevoPresupuesto >= 0) {
    presupuesto = nuevoPresupuesto;
    return presupuesto;
  } else {
    console.error("El valor del presupuesto no es válido");
    return -1;
  }
}

// Función para mostrar el presupuesto actual
function mostrarPresupuesto() {
  return `Tu presupuesto actual es de ${presupuesto} €`;
}

// Función constructora de un gasto
function CrearGasto(descripcion, valor) {
  if (typeof valor !== "number" || valor < 0) {
    valor = 0;
  }

  return {
    descripcion: descripcion,
    valor: valor,

    mostrarGasto() {
      return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    },

    actualizarDescripcion(nuevaDesc) {
      this.descripcion = nuevaDesc;
    },

    actualizarValor(nuevoValor) {
      if (typeof nuevoValor === "number" && nuevoValor >= 0) {
        this.valor = nuevoValor;
      }
    },
  };
}

// Exportamos lo necesario para los tests
module.exports = {
  presupuesto,
  actualizarPresupuesto,
  mostrarPresupuesto,
  CrearGasto,
};
