// Importamos el archivo con la lógica de negocio
// (En entorno real, esto se haría con import/export, pero aquí asumimos que gestionPresupuesto.js ya está cargado o en el mismo proyecto)

// --- VARIABLES GLOBALES DEL FRONTEND ---
const capaTotal = document.getElementById("totalGastos");
const capaFormulario = document.getElementById("formulario");
const capaListado = document.getElementById("listado");

// --- CREAR FORMULARIO DESDE JS ---
function crearFormulario() {
  const form = document.createElement("form");
  form.id = "formGasto";

  // Campos del formulario
  form.innerHTML = `
    <label>Descripción:</label>
    <input type="text" id="desc" required>

    <label>Valor (€):</label>
    <input type="number" id="valor" required min="0">

    <label>Fecha:</label>
    <input type="date" id="fecha">

    <label>Etiquetas (separadas por comas):</label>
    <input type="text" id="etiquetas">

    <br><button type="submit">Añadir gasto</button>
  `;

  // Evitar recarga al enviar el formulario
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const desc = document.getElementById("desc").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const fecha = document.getElementById("fecha").value;
    const etiquetasTexto = document.getElementById("etiquetas").value;
    const etiquetas = etiquetasTexto
      ? etiquetasTexto.split(",").map((e) => e.trim())
      : [];

    // Crear el gasto con la función del otro archivo
    const nuevoGasto = CrearGasto(desc, valor, fecha, ...etiquetas);
    anyadirGasto(nuevoGasto);

    // Limpiamos el formulario
    form.reset();

    // Actualizamos la vista
    pintarListado();
    mostrarTotal();
  });

  capaFormulario.appendChild(form);
}

// --- MOSTRAR TOTAL DE GASTOS ---
function mostrarTotal() {
  const total = calcularTotalGastos();
  capaTotal.textContent = `${total} €`;
}

// --- PINTAR LISTADO DE GASTOS ---
function pintarListado() {
  capaListado.innerHTML = "<h2>Listado de gastos</h2>"; // limpiamos

  const lista = document.createElement("ul");
  const gastosActuales = listarGastos();

  if (gastosActuales.length === 0) {
    lista.innerHTML = "<li>No hay gastos registrados todavía</li>";
  } else {
    gastosActuales.forEach((g) => {
      const li = document.createElement("li");
      const fecha = new Date(g.fecha).toLocaleDateString();

      li.innerHTML = `
        <strong>${g.descripcion}</strong> - ${g.valor} €<br>
        <small>${fecha}</small><br>
        <em>Etiquetas: ${g.etiquetas.join(", ") || "ninguna"}</em>
      `;

      // Botón borrar
      const btnBorrar = document.createElement("button");
      btnBorrar.textContent = "Borrar";
      btnBorrar.style.marginLeft = "10px";

      // Evento para borrar el gasto
      btnBorrar.addEventListener("click", () => {
        const confirmar = window.confirm(
          "¿Seguro que quieres borrar este gasto?"
        );
        if (confirmar) {
          borrarGasto(g.id);
          pintarListado();
          mostrarTotal();
        }
      });

      li.appendChild(btnBorrar);
      lista.appendChild(li);
    });
  }

  capaListado.appendChild(lista);
}

// --- INICIALIZACIÓN ---
function init() {
  // Creamos algunos gastos de prueba
  anyadirGasto(CrearGasto("Café", 1.5, "2025-11-01", "ocio"));
  anyadirGasto(CrearGasto("Gasolina", 40, "2025-11-02", "transporte"));
  anyadirGasto(CrearGasto("Netflix", 12.99, "2025-11-01", "entretenimiento"));

  crearFormulario();
  pintarListado();
  mostrarTotal();
}

// Arrancamos la app
init();
