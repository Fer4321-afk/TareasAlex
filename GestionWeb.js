// llamar html
const capaTotal = document.getElementById("totalGastos");
const capaFormulario = document.getElementById("formulario");
const capaListado = document.getElementById("listado");
const CLAVE_GASTOS = "misGastosGuardados";

function crearFormulario() {
  // form en memoria no se ve todavía
  const form = document.createElement("form");

  // líneas y variables
  form.innerHTML = `
    <label>Descripción:</label>
    <input type="text" id="desc" required>  ⭐ required = campo obligatorio
    
    <label>Valor (€):</label>
    <input type="number" id="valor" required min="0"> ⭐ min="0" = no negativo
    
    <label>Fecha:</label>
    <input type="date" id="fecha">  ⭐ type="date" = selector de fecha nativo
    
    <label>Etiquetas (coma):</label>
    <input type="text" id="etiquetas">  ⭐ Ej: "comida, trabajo, urgente"
    
    <br><button type="submit">Añadir gasto</button>
  `;

  //ENVÍA el formulario
  form.addEventListener("submit", (e) => {
    //evita recargar página
    e.preventDefault();
    //Guardar valoraes
    const desc = document.getElementById("desc").value;
    //numero== decimal
    const valor = parseFloat(document.getElementById("valor").value);
    const fecha = document.getElementById("fecha").value;
    const etiq = document.getElementById("etiquetas").value;
    // procesar etiquetas:a un array
    const etiquetas = etiq
      ? //dividir por comas y quitar espacios
        etiq.split(",").map((e) => e.trim())
      : [];
    const nuevo = CrearGasto(desc, valor, fecha, ...etiquetas);
    anyadirGasto(nuevo);

    // LIMPIAR
    form.reset();
    // recargar lista y total
    pintarListado();
    mostrarTotal();
  });
  //lamar al formiliar y hacerlo visible
  capaFormulario.appendChild(form);
}

//  MOSTRAR TOTAL
function mostrarTotal() {
  capaTotal.textContent = calcularTotalGastos() + " €";
  //le pone al texto el simbolo de euro
}

function pintarListado() {
  //el iners ese cambia todo el html
  capaListado.innerHTML = "<h2>Listado de gastos</h2>";
  const lista = document.createElement("ul");
  const gastos = listarGastos();

  if (gastos.length === 0) {
    lista.innerHTML = "<li>No hay gastos aun</li>";
  } else {
    // ejecuta función por cada gasto
    gastos.forEach((g) => {
      const li = document.createElement("li");
      const fechaBonita = new Date(g.fecha).toLocaleDateString();

      // Crear HTML interno del <li>:
      li.innerHTML = `
        <strong>${g.descripcion}</strong> - ${g.valor} €<br>
        <small>${fechaBonita}</small><br>
        <em>${g.etiquetas.join(", ") || "sin etiquetas"}</em>
      `;

      const btn = document.createElement("button");
      btn.textContent = "Borrar";

      // Evento al hacer click
      btn.addEventListener("click", () => {
        if (confirm("Seguro q quieres borrar esto?")) {
          // Borrar gasto y actualizar lista y total
          borrarGasto(g.id);
          pintarListado();
          mostrarTotal();
        }
      });
      // Añadir botón al <li> y <li> a la lista
      li.appendChild(btn);
      lista.appendChild(li);
    });
  }

  capaListado.appendChild(lista);
}

function guardarEnLocalStorage() {
  const lista = listarGastos();
  const texto = JSON.stringify(lista);
  localStorage.setItem(CLAVE_GASTOS, texto);
  alert("Guardado en localStorage jeje");
}

function cargarDesdeLocalStorage() {
  const datos = localStorage.getItem(CLAVE_GASTOS);

  if (!datos) {
    alert("No hay nada guardao");
    return; //exit
  }

  //texto == Objetos
  const objetosPlanos = JSON.parse(datos);
  //new [] X nmap
  const lista = objetosPlanos.map((g) => {
    return CrearGasto(g.descripcion, g.valor, g.fecha, ...(g.etiquetas || []));
  });
  // -----ACTUALIZAR DATOS-----
  sobrescribirGastos(lista);
  pintarListado();
  mostrarTotal();

  alert("Datos cargados :)");
}

// ----INICIALIZACIÓN-----
function init() {
  crearFormulario();
  pintarListado();
  mostrarTotal();

  // BOTONES DE GUARDAR/CARGAR:
  document
    .getElementById("btnGuardar")
    .addEventListener("click", guardarEnLocalStorage);
  //  guardarEnLocalStorage()

  document
    .getElementById("btnCargar")
    .addEventListener("click", cargarDesdeLocalStorage);
  //  cargarDesdeLocalStorage()
}

init();
