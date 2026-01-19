function calcularMedia(...numeros) {
  // El parámetro 'numeros' es un array que contiene el listado
  // de los parámetros pasados en la llamada a la función

  let suma = 0;
  let cantidad = numeros.length;

  if (cantidad == 0) return 0;

  for (let num of numeros) {
    suma += num;
  }

  return suma / cantidad;
}

let media1 = calcularMedia(4, 6, 5); // 5
let media2 = calcularMedia(20, 40, 80, 60); // 50
let media3 = calcularMedia(3, 16, 22, 98, 16, 40); //32.5
