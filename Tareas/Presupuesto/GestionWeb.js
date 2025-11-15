// --- VARIABLES DEL FRONT ---
const capaTotal = document.getElementById("totalGastos");
const capaFormulario = document.getElementById("formulario");
const capaListado = document.getElementById("listado");

// clave pa guardar en localStorage
const CLAVE_GASTOS = "misGastosGuardados";

// --- FORMULARIO ---
function crearFormulario() {
  const form = document.createElement("form");

  form.innerHTML = `
    <label>Descripción:</label>
    <input type="text" id="desc" required>

    <label>Valor (€):</label>
    <input type="number" id="valor" required min="0">

    <label>Fecha:</label>
    <input type="date" id="fecha">

    <label>Etiquetas (coma):</label>
    <input type="text" id="etiquetas">

    <br><button type="submit">Añadir gasto</button>
  `;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const desc = document.getElementById("desc").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const fecha = document.getElementById("fecha").value;
    const etiq = document.getElementById("etiquetas").value;
    const etiquetas = etiq ? etiq.split(",").map((e) => e.trim()) : [];

    const nuevo = CrearGasto(desc, valor, fecha, ...etiquetas);
    anyadirGasto(nuevo);

    form.reset();
    pintarListado();
    mostrarTotal();
  });

  capaFormulario.appendChild(form);
}

// --- TOTAL ---
function mostrarTotal() {
  capaTotal.textContent = calcularTotalGastos() + " €";
}

// --- LISTADO ---
function pintarListado() {
  capaListado.innerHTML = "<h2>Listado de gastos</h2>";

  const lista = document.createElement("ul");
  const gastos = listarGastos();

  if (gastos.length === 0) {
    lista.innerHTML = "<li>No hay gastos aun</li>";
  } else {
    gastos.forEach((g) => {
      const li = document.createElement("li");
      const fechaBonita = new Date(g.fecha).toLocaleDateString();

      li.innerHTML = `
        <strong>${g.descripcion}</strong> - ${g.valor} €<br>
        <small>${fechaBonita}</small><br>
        <em>${g.etiquetas.join(", ") || "sin etiquetas"}</em>
      `;

      const btn = document.createElement("button");
      btn.textContent = "Borrar";

      btn.addEventListener("click", () => {
        if (confirm("Seguro q quieres borrar esto?")) {
          borrarGasto(g.id);
          pintarListado();
          mostrarTotal();
        }
      });

      li.appendChild(btn);
      lista.appendChild(li);
    });
  }

  capaListado.appendChild(lista);
}

// --- GUARDAR ---
function guardarEnLocalStorage() {
  const lista = listarGastos();
  const texto = JSON.stringify(lista); // paso a texto
  localStorage.setItem(CLAVE_GASTOS, texto);
  alert("Guardado en localStorage jeje");
}

// --- CARGAR ---
function cargarDesdeLocalStorage() {
  const datos = localStorage.getItem(CLAVE_GASTOS);

  if (!datos) {
    alert("No hay nada guardao");
    return;
  }

  const objetosPlanos = JSON.parse(datos);

  // vuelvo a transformar a gasto real
  const lista = objetosPlanos.map((g) => {
    return CrearGasto(g.descripcion, g.valor, g.fecha, ...(g.etiquetas || []));
  });

  sobrescribirGastos(lista);

  pintarListado();
  mostrarTotal();
  alert("Datos cargados :)");
}

// --- INICIO ---
function init() {
  crearFormulario();
  pintarListado();
  mostrarTotal();

  document
    .getElementById("btnGuardar")
    .addEventListener("click", guardarEnLocalStorage);
  document
    .getElementById("btnCargar")
    .addEventListener("click", cargarDesdeLocalStorage);
}

init();
