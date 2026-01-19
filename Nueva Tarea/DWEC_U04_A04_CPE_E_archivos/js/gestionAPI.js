/**
 * GESTIÓN API - Conexión con servidor
 */
const API_URL = "http://localhost:3000";
let usuarioActual = "";

// Inicializar cuando cargue la página
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("btnCargarAPI")
    .addEventListener("click", cargarDesdeAPI);
});

// Cargar gastos desde el servidor
async function cargarDesdeAPI() {
  const usuario = document.getElementById("nombreUsuario").value.trim();

  if (!usuario) {
    mostrarMensaje("Ingresa usuario1 o usuario2", "error");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${usuario}`);
    if (!response.ok) throw new Error("Usuario no encontrado");

    const gastos = await response.json();
    usuarioActual = usuario;

    // Actualizar la aplicación con los gastos del servidor
    actualizarAplicacionConGastos(gastos);
    mostrarMensaje(
      `✅ Gastos de ${usuario} cargados: ${gastos.length} gastos`,
      "exito"
    );
  } catch (error) {
    mostrarMensaje("Error: " + error.message, "error");
  }
}

// Actualizar aplicación con gastos del servidor
function actualizarAplicacionConGastos(gastosServidor) {
  const gastosFormateados = gastosServidor.map((gasto) => ({
    id: gasto.id,
    descripcion: gasto.description, // CAMBIO: gasto.descripcion → gasto.description
    valor: gasto.valor,
    fecha: gasto.fecha,
    etiquetas: gasto.etiquetas || [],
  }));

  // Si existe la función sobrescribirGastos, la usamos
  if (typeof window.sobrescribirGastos === "function") {
    window.sobrescribirGastos(gastosFormateados);
    // Forzar actualización de la interfaz
    if (typeof window.pintarListado === "function") {
      window.pintarListado();
      window.mostrarTotal();
    }
  } else {
    // Actualizar manualmente
    actualizarInterfazManual(gastosFormateados);
  }
}

// Actualizar interfaz manualmente
function actualizarInterfazManual(gastos) {
  const lista = document.getElementById("listaGastos");
  const totalElement = document.getElementById("totalGastos");

  // Calcular total
  const total = gastos.reduce((sum, gasto) => sum + gasto.valor, 0);
  if (totalElement) {
    totalElement.textContent = total.toFixed(2) + " €";
  }

  // Mostrar lista
  if (lista) {
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
                    <button class="btn-eliminar" onclick="eliminarGastoAPI('${
                      gasto.id
                    }')">Eliminar</button>
                </div>
            </div>
        `
      )
      .join("");
  }
}

// Eliminar gasto del servidor
async function eliminarGastoAPI(gastoId) {
  if (!usuarioActual || !confirm("¿Eliminar gasto del servidor?")) return;

  try {
    const response = await fetch(`${API_URL}/${usuarioActual}/${gastoId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar");

    await cargarDesdeAPI(); // Recargar lista actualizada
    mostrarMensaje("Gasto eliminado del servidor", "exito");
  } catch (error) {
    mostrarMensaje("Error al eliminar: " + error.message, "error");
  }
}

// Mostrar mensajes
function mostrarMensaje(texto, tipo) {
  const mensaje = document.getElementById("mensajeAPI");
  if (mensaje) {
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
    setTimeout(() => {
      mensaje.textContent = "";
      mensaje.className = "mensaje";
    }, 4000);
  }
}
