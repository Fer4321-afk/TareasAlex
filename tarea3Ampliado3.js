// Variables globales
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

// FUNCION ACTUALIZAR PRESUPUESTO
function actualizarPresupuesto(nuevoPresupuesto) {
  if (typeof nuevoPresupuesto === "number" && nuevoPresupuesto >= 0) {
    presupuesto = nuevoPresupuesto;
    return presupuesto;
  } else {
    console.error("El valor del presupuesto no es válido");
    return -1;
  }
}

//FUNCION MOSTRAR PRESUPUESTO
function mostrarPresupuesto() {
  return `Tu presupuesto actual es de ${presupuesto} €`;
}

//---------- INICIO FUNCION GASTOS BASICAS----------//

// F.CONSTRUCTORA DE GASTOS
function CrearGasto(descripcion, valor = 0, fecha, ...etiquetas) {
  // Validar valor
  if (typeof valor !== "number" || valor < 0) {
    valor = 0;
  }

  // VALIDAR FECHA
  let fechaValida = Date.parse(fecha);
  if (isNaN(fechaValida)) {
    fechaValida = Date.now();
  }

  // ETIQUETAS
  let listaEtiquetas = Array.isArray(etiquetas) ? etiquetas : [];

  return {
    descripcion: descripcion,
    valor: valor,
    fecha: fechaValida,
    etiquetas: listaEtiquetas,

    //MOSTRAR GASTO SIMPLE Y COMPLETO
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

    obtenerPeriodoAgrupacion(periodo) {
      //ESTA CONVIERTE LA FECHA NUMERICA A FORMATO "DATE"
      let fechaGasto = new Date(this.fecha);
      let año = fechaGasto.getFullYear();
      let mes = String(fechaGasto.getMonth() + 1).padStart(2, "0");
      let dia = String(fechaGasto.getDate()).padStart(2, "0");

      //CONPROBAR EL TIPO DE PERIODO Q SE PIDIO
      if (periodo === "dia") {
        return `${año}-${mes}-${dia}`;
        // SI PIDE DIA : devuelve año-mes-día "2025-05-23"
      } else if (periodo === "año") {
        return `${año}`;
        //SOLO DA AÑO
      } else {
        return `${año}-${mes}`; // POR DEFECTO DEVUELVE AÑO-MES "2025-05"
      }
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
//----------FIN FUNCION GASTOS BASICAS----------//

// ---------- INICIO FUNCIONES AMPLIADAS ----------//

// Función para calcular balance (presupuesto - gastos)
function calcularBalance() {
  return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtros = {}) {
  return gastos.filter((gasto) => {
    let fechaGasto = new Date(gasto.fecha);

    if (filtros.fechaDesde && fechaGasto < new Date(filtros.fechaDesde)) {
      return false;
    }

    if (filtros.fechaHasta && fechaGasto > new Date(filtros.fechaHasta)) {
      return false;
    }

    if (filtros.valorMin !== undefined && gasto.valor < filtros.valorMin) {
      return false;
    }

    if (filtros.valorMax !== undefined && gasto.valor > filtros.valorMax) {
      return false;
    }

    if (filtros.etiquetas && filtros.etiquetas.length > 0) {
      let etiquetasGasto = gasto.etiquetas.map((e) => e.toLowerCase());
      let etiquetasFiltro = filtros.etiquetas.map((e) => e.toLowerCase());
      let tieneEtiqueta = etiquetasFiltro.some((et) =>
        etiquetasGasto.includes(et)
      );
      if (!tieneEtiqueta) {
        return false;
      }
    }
    return true;
  });
}

function agruparGastosPorPeriodo(
  periodo = "mes",
  etiquetas = [],
  fechaDesde,
  fechaHasta
) {
  let gastosFiltrados = filtrarGastos({ etiquetas, fechaDesde, fechaHasta });

  let resultado = gastosFiltrados.reduce((acc, gasto) => {
    let clave = gasto.obtenerPeriodoAgrupacion(periodo);
    if (!acc[clave]) {
      acc[clave] = 0;
    }
    acc[clave] += gasto.valor;
    return acc;
  }, {});
  return resultado;
}
// ---------- FIN FUNCIONES AMPLIADAS ----------//

//--------EXPORTACION A TEST---------------- //
module.export = {
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
  //NUEVAS FUNCIONES (EJERCICIO AMPLIADO P2)
  filtrarGastos,
  agruparGastosPorPeriodo,
};
