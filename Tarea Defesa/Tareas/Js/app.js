// libreria que gestiona los gastos por usuario
// usamos promesas de fs para leer y escribir datos
import { readFile, writeFile } from "fs/promises";

const NOMBRE_FICHERO = "./datos.json";

function obtenerGastosUsuario(usuario) {
  return readFile(NOMBRE_FICHERO, "utf-8")
    .then((datos) => {
      const obj = JSON.parse(datos);
      return obj[usuario] || [];
    })
    .catch((err) => {
      console.error("Error leyendo el fichero:", err);
      return [];
    });
}

function anyadirGastoUsuario(usuario, gasto) {
  return readFile(NOMBRE_FICHERO, "utf-8").then((datos) => {
    const obj = JSON.parse(datos);
    if (!obj[usuario]) obj[usuario] = [];
    obj[usuario].push(gasto);
    return writeFile(NOMBRE_FICHERO, JSON.stringify(obj, null, 2));
  });
}

function actualizarGastoUsuario(usuario, gastoId, nuevosDatos) {
  return readFile(NOMBRE_FICHERO, "utf-8").then((datos) => {
    const obj = JSON.parse(datos);
    if (!obj[usuario]) return Promise.reject(new Error("Usuario no existe"));

    const index = obj[usuario].findIndex((g) => g.id === gastoId);
    if (index === -1) return Promise.reject(new Error("Gasto no existe"));

    obj[usuario][index] = { ...obj[usuario][index], ...nuevosDatos };
    return writeFile(NOMBRE_FICHERO, JSON.stringify(obj, null, 2));
  });
}

function borrarGastoUsuario(usuario, gastoId) {
  return readFile(NOMBRE_FICHERO, "utf-8").then((datos) => {
    const obj = JSON.parse(datos);
    if (!obj[usuario]) return Promise.reject(new Error("Usuario no existe"));

    obj[usuario] = obj[usuario].filter((g) => g.id !== gastoId);
    return writeFile(NOMBRE_FICHERO, JSON.stringify(obj, null, 2));
  });
}

// --- EXPORTAMOS las funciones pa usar en index.html ---
export {
  obtenerGastosUsuario,
  anyadirGastoUsuario,
  actualizarGastoUsuario,
  borrarGastoUsuario,
};

// --- Cambio de fichero  ---
