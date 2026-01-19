// Ejemplo de test utilizando el módulo assert disponible en NodeJS

// Cargar el módulo assert
var assert = require("assert");

// Cargar el módulo con las funciones para testear
var operaciones = require("../../operations.js");

// Test
it("comprobar función suma", function () {
  assert.equal(operaciones.suma(1, 3), 4);
  assert.equal(operaciones.suma(-1, 3), 2);
  assert.equal(operaciones.suma(8, -3), 5);
});

it("comprobar función división", function () {
  assert.equal(operaciones.division(12, 3), 4);
  assert.equal(operaciones.division(9, -3), -3);
  assert.equal(operaciones.division(15, 5), 3);
});

it("comprobar función resta", function () {
  assert.equal(operaciones.resta(12, 3), 9);
  assert.equal(operaciones.resta(10, 4), 6);
  assert.equal(operaciones.resta(15, 5), 10);
});
it("comprobar función multiplicacion", function () {
  assert.equal(operaciones.multiplicacion(12, 3), 36);
  assert.equal(operaciones.multiplicacion(10, 4), 40);
  assert.equal(operaciones.multiplicacion(15, 5), 75);
});
it("comprobar función Resto", function () {});
assert.equal(operaciones.Resto(13, 3), 1);
assert.equal(operaciones.Resto(11, 4), 3);
assert.equal(operaciones.Resto(17, 5), 2);
