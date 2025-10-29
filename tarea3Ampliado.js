// Variables globales
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

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
function CrearGasto(descripcion, valor = 0, fecha, ...etiquetas) {
  // Validar valor
  if (typeof valor !== "number" || valor < 0) {
    valor = 0;
  }

  // Validar fecha
  let fechaValida = Date.parse(fecha);
  if (isNaN(fechaValida)) {
    fechaValida = Date.now();
  }

  // Etiquetas
  let listaEtiquetas = Array.isArray(etiquetas) ? etiquetas : [];

  return {
    descripcion: descripcion,
    valor: valor,
    fecha: fechaValida,
    etiquetas: listaEtiquetas,

    mostrarGasto() {
      return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    },

    mostrarGastoCompleto() {
      let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
      texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\nEtiquetas:\n`;
      if (this.etiquetas.length > 0) {
        this.etiquetas.forEach((et) => {
          texto += `- ${et}\n`;
        });
      }
      return texto.trim();
    },

    actualizarDescripcion(nuevaDesc) {
      this.descripcion = nuevaDesc;
    },

    actualizarValor(nuevoValor) {
      if (typeof nuevoValor === "number" && nuevoValor >= 0) {
        this.valor = nuevoValor;
      }
    },

    actualizarFecha(nuevaFecha) {
      let f = Date.parse(nuevaFecha);
      if (!isNaN(f)) {
        this.fecha = f;
      }
    },

    anyadirEtiquetas(...nuevas) {
      nuevas.forEach((et) => {
        if (!this.etiquetas.includes(et)) {
          this.etiquetas.push(et);
        }
      });
    },

    borrarEtiquetas(...aBorrar) {
      this.etiquetas = this.etiquetas.filter((et) => !aBorrar.includes(et));
    },
  };
}

// Función para listar gastos
function listarGastos() {
  return gastos;
}

// Función para añadir un gasto
function anyadirGasto(gasto) {
  gasto.id = idGasto++;
  gastos.push(gasto);
}

// Función para borrar un gasto por id
function borrarGasto(id) {
  gastos = gastos.filter((g) => g.id !== id);
}

// Función para calcular total de gastos
function calcularTotalGastos() {
  let total = 0;
  gastos.forEach((g) => {
    total += g.valor;
  });
  return total;
}

// Función para calcular balance (presupuesto - gastos)
function calcularBalance() {
  return presupuesto - calcularTotalGastos();
}

// Exportamos todo para los tests
module.exports = {
  // Variables
  gastos,
  idGasto,
  presupuesto,
  // Funciones
  listarGastos,
  actualizarPresupuesto,
  mostrarPresupuesto,
  CrearGasto,
  anyadirGasto,
  borrarGasto,
  calcularTotalGastos,
  calcularBalance,
};
