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

  limpiarRegistro: function() {
    this.modelo.limpiarRegistro();
  },

  agregarVotos: function(nombrePregunta, respuestaSeleccionada, usuario, fecha) {
    this.modelo.agregarVotos(nombrePregunta, respuestaSeleccionada, usuario, fecha);
  },

  obtenerPreguntas: function() {
    this.modelo.enviarPreguntas();
  },

  obtenerRegistro: function() {
    this.modelo.enviarRegistro();
  }

};
