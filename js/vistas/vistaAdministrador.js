/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores

  this.modelo.preguntasEnviadas.suscribir(function(preguntas) {
    contexto.reconstruirLista(preguntas.preguntas);
  });

  this.modelo.registroEnviado.suscribir(function(registro) {
    contexto.mostrarRegistro(registro.registroUsuarios);
  });

  this.modelo.preguntaAgregada.suscribir(function(preguntas) {
    contexto.reconstruirLista(preguntas.preguntas);
  });

  this.modelo.preguntaEditada.suscribir(function(preguntas) {
    contexto.reconstruirLista(preguntas.preguntas);
  });

  this.modelo.preguntaEliminada.suscribir(function(preguntas) { 
    contexto.reconstruirLista(preguntas.preguntas); 
  });

  this.modelo.todasLasPreguntasEliminadas.suscribir(function(preguntas) {
    contexto.reconstruirLista(preguntas.preguntas);
  });

  this.modelo.registroLimpio.suscribir(function() {
    contexto.borrarRegistro();
  });

};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    this.controlador.obtenerPreguntas();
    this.controlador.obtenerRegistro();
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.configuracionDeBotones();
    validacionDeFormulario();

  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var nuevoItem = $('<li class="list-group-item" id="' + pregunta.id + '">' + pregunta.textoPregunta + '</li>');
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function(preguntasEnviadas) {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = preguntasEnviadas;
    for (var i=0 ; i < preguntas.length; i++){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var pregunta = e.pregunta.val();
      var respuestas = [];
      if(pregunta !== "") { 
        $('[name="option[]"]').each(function() {
          //completar
          if($(this).val() !== "") {
            var respuesta = $(this).val();
            respuestas.push({"textoRespuesta": respuesta, "cantidad": 0});
          }
        }, this);
        if(respuestas.length > 1) {
          contexto.controlador.agregarPregunta(pregunta, respuestas);
          contexto.limpiarFormulario();
        } else {
          alert('Tenes que poner al menos dos respuestas para la pregunta guach');
        }
      } else {
        alert('No hiciste ninguna pregunta amiguero');
      }
    });

    //asociar el resto de los botones a eventos

    e.botonEditarPregunta.click(function() {
      var id = parseInt($('.list-group-item.active').attr('id'));
      if(isNaN(id)) {
        alert('Elegi una pregunta, que si no no anda.');
      } else {
        var nuevoTextoPregunta = prompt('¿Que pregunta queres hacer?', 'escribi la pregunta');
        if (nuevoTextoPregunta !== ('' || null)) {
          contexto.controlador.editarPregunta(id, nuevoTextoPregunta);
        }
      }
    });

    e.botonBorrarPregunta.click(function() {
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(id);
    });

    e.borrarTodo.click(function() {
      contexto.controlador.borrarTodasLasPreguntas();
    });

    e.limpiarRegistro.click(function() {
      contexto.controlador.limpiarRegistro();
    });

  },

  mostrarRegistro: function(registroEnviado) {
    var contexto = this;
    var pantalla = contexto.elementos.registroDeVotantes;
    var registro = registroEnviado;
    registro.forEach(function(usuario) {
      pantalla.append($('<li>', {
        text: usuario.fecha + ', ' + usuario.usuario + ' respondio: ' + '"' + usuario.respuesta + '"' + ' a la pregunta ' + '"' + usuario.pregunta + '"' 
      }));
    });
  },

  borrarRegistro: function() {
    $('#registroVotantes').remove();
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
