/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
	
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  editarPregunta: function(idPregunta, nuevoTexto) {
    this.modelo.editarPregunta(idPregunta, nuevoTexto);
  },

  borrarPregunta: function(id) {
    this.modelo.borrarPregunta(id);
  },

  borrarTodasLasPreguntas: function() {
    this.modelo.borrarTodasLasPreguntas();
  },

  agregarVotos: function(nombrePregunta, respuestaSeleccionada, usuario) {
    this.modelo.agregarVotos(nombrePregunta, respuestaSeleccionada, usuario);
  },

  mostrarRegistro: function(registroPantalla) {
    this.modelo.mostrarRegistro(registroPantalla);
  },

};
