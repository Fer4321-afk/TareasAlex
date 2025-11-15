/**
 * Función que simula una petición a una API.
 * Devuelve una promesa que se resuelve o rechaza después de 2 segundos.
 * @param {boolean} exito - Si true, la promesa se resuelve. Si false, se rechaza.
 * @returns {Promise<string>}
 */
function simularPeticionAPI(exito) {
  // Creamos una promesa usando el constructor
  return new Promise((resolver, rechazar) => {
    console.log("Procesando petición...");

    // Simulamos el tiempo de espera
    setTimeout(() => {
      if (exito) {
        // Si la operación fue exitosa, resolvemos la promesa
        resolver("¡Datos recibidos con éxito!");
      } else {
        // Si falló, rechazamos la promesa
        rechazar("Error: No se pudieron obtener los datos.");
      }
    }, 2000); // 2 segundos de espera
  });
}
