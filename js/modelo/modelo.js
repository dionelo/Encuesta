/*
 * Modelo
 */
var Modelo = function() {

  this.actualizar();

  if(this.preguntas === null) {
    this.preguntas = [];
  };

  if(this.registroUsuarios === null) {
    this.registroUsuarios = [];
  };
    
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.todasLasPreguntasEliminadas = new Evento(this);
  this.votosAgregados = new Evento(this);
  this.usuariosRegistrados = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    if(this.preguntas.length > 0) {
      var ultimaPregunta = this.preguntas[this.preguntas.length - 1];
      return ultimaPregunta.id;
    } else {
      return 0;
    }
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  editarPregunta: function(idPregunta, nuevoTexto) {
    this.preguntas.forEach(function(pregunta) {   
      if(pregunta.id == idPregunta) {
        pregunta.textoPregunta = nuevoTexto;
      }
    }, this);
     this.guardar();
     this.preguntaEditada.notificar();
  },

  borrarPregunta: function(idPregunta) {
    this.preguntas.forEach(function(pregunta) { 
      if(pregunta.id == idPregunta){
        var i = this.preguntas.indexOf(pregunta);
        this.preguntas.splice(i, 1);
      }
    }, this);
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  borrarTodasLasPreguntas: function() {
    this.preguntas = [];
    this.guardar();
    this.todasLasPreguntasEliminadas.notificar();
  },

  agregarVotos: function(nombrePregunta, respuestaSeleccionada, usuario) {
   this.preguntas.forEach(function(pregunta) {
      pregunta.cantidadPorRespuesta.forEach(function(respuesta) { 
        if(pregunta.textoPregunta === nombrePregunta && respuesta.textoRespuesta === respuestaSeleccionada) {
          respuesta.cantidad += 1;
        }
      }, this);  
   }, this);
   var usuario = {
     usuario: usuario,
     pregunta: nombrePregunta,
     respuesta: respuestaSeleccionada
   };
   this.registroUsuarios.push(usuario);
   this.guardar();
   this.votosAgregados.notificar();
  },

  mostrarRegistro: function(pantalla) {
    var registro = this.registroUsuarios;
    registro.forEach(function(usuario) {
      var li = document.createElement('li');
      var contenido = document.createTextNode(usuario.usuario + ' ' + usuario.pregunta + ' ' + usuario.respuesta);
      pantalla.appendChild(li);
      pantalla.appendChild(contenido);
    });
    this.usuariosRegistrados.notificar();
  }, 

  //se guardan las preguntas
  guardar: function(){
    var preguntas = JSON.stringify(this.preguntas);
    localStorage.setItem('preguntasEncuesta', preguntas);

    var registro = JSON.stringify(this.registroUsuarios);
    localStorage.setItem('registro', registro);
  },

  actualizar: function(){
    var preguntas = localStorage.getItem('preguntasEncuesta');
    this.preguntas = JSON.parse(preguntas);

    var registro = localStorage.getItem('registro');
    this.registroUsuarios = JSON.parse(registro);

  }

};
