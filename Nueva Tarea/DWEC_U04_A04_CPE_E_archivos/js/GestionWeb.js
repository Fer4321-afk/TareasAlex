/**
 * GESTIÓN WEB - Aplicación completa de gestión de gastos
 * Maneja toda la lógica del frontend
 */

// ==================== GESTIÓN DE DATOS ====================
let listaGastos = [];

// Crear nuevo gasto
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
  return {
    id: crypto.randomUUID(),
    descripcion,
    valor,
    fecha: fecha || new Date().toISOString().split("T")[0],
    etiquetas: etiquetas || [],
  };
}

// Añadir gasto a la lista
function anyadirGasto(gasto) {
  listaGastos.push(gasto);
}

// Devolver copia de gastos
function listarGastos() {
  return [...listaGastos];
}

// Borrar gasto por ID
function borrarGasto(id) {
  listaGastos = listaGastos.filter((g) => g.id !== id);
}

// Calcular total gastado
function calcularTotalGastos() {
  return listaGastos.reduce((total, g) => total + g.valor, 0);
}

// Reemplazar lista completa
function sobrescribirGastos(nuevaLista) {
  listaGastos = nuevaLista;
}

// ==================== INTERFAZ DE USUARIO ====================

// Crear formulario para añadir gastos
function crearFormulario() {
  const formularioDiv = document.getElementById("formulario");
  if (!formularioDiv) return;

  formularioDiv.innerHTML = `
    <form id="formGasto">
      <label>Descripción:</label>
      <input type="text" id="descripcion" required>
      
      <label>Valor (€):</label>
      <input type="number" id="valor" step="0.01" required>
      
      <label>Fecha:</label>
      <input type="date" id="fecha">
      
      <label>Etiquetas (separadas por coma):</label>
      <input type="text" id="etiquetas" placeholder="comida, transporte, ocio">
      
      <button type="submit">Añadir Gasto</button>
    </form>
  `;

  // Evento para enviar formulario
  document.getElementById("formGasto").addEventListener("submit", function (e) {
    e.preventDefault();

    const descripcion = document.getElementById("descripcion").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const fecha = document.getElementById("fecha").value;
    const etiquetas = document
      .getElementById("etiquetas")
      .value.split(",")
      .map((e) => e.trim())
      .filter((e) => e);

    const nuevoGasto = CrearGasto(descripcion, valor, fecha, ...etiquetas);
    anyadirGasto(nuevoGasto);

    pintarListado();
    mostrarTotal();

    this.reset();
  });
}

// Configurar botones de guardado local
function configurarBotonesLocales() {
  document.getElementById("btnGuardar").addEventListener("click", function () {
    localStorage.setItem("gastos", JSON.stringify(listaGastos));
    alert("Gastos guardados en localStorage");
  });

  document.getElementById("btnCargar").addEventListener("click", function () {
    const gastosGuardados = localStorage.getItem("gastos");
    if (gastosGuardados) {
      listaGastos = JSON.parse(gastosGuardados);
      pintarListado();
      mostrarTotal();
      alert("Gastos cargados desde localStorage");
    }
  });
}

// Mostrar lista de gastos en pantalla
function pintarListado() {
  const lista = document.getElementById("listaGastos");
  const gastos = listarGastos();

  if (!lista) return;

  if (gastos.length === 0) {
    lista.innerHTML = "<p>No hay gastos</p>";
    return;
  }

  lista.innerHTML = gastos
    .map(
      (gasto) => `
    <div class="gasto-item">
      <div class="gasto-info">
        <strong>${gasto.descripcion}</strong>
        <br>
        <small>${gasto.valor}€ - ${new Date(
        gasto.fecha
      ).toLocaleDateString()}</small>
        ${
          gasto.etiquetas && gasto.etiquetas.length > 0
            ? `<br><em>${gasto.etiquetas.join(", ")}</em>`
            : ""
        }
      </div>
      <div class="acciones-gasto">
        <button class="btn-eliminar" onclick="borrarGasto('${
          gasto.id
        }'); pintarListado(); mostrarTotal();">Eliminar</button>
      </div>
    </div>
  `
    )
    .join("");
}

// Mostrar total de gastos
function mostrarTotal() {
  const totalElement = document.getElementById("totalGastos");
  if (totalElement) {
    const total = calcularTotalGastos();
    totalElement.textContent = total.toFixed(2) + " €";
  }
}

// ==================== INICIALIZACIÓN ====================

// Iniciar la aplicación cuando cargue la página
document.addEventListener("DOMContentLoaded", function () {
  crearFormulario();
  configurarBotonesLocales();
  pintarListado();
  mostrarTotal();
});
