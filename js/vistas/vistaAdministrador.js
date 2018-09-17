/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEliminada.suscribir(function() { 
    contexto.reconstruirLista(); 
  });

  this.modelo.todasLasPreguntasEliminadas.suscribir(function() {
    contexto.reconstruirLista();
  });

};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.reconstruirLista();
    this.configuracionDeBotones();
    this.mostrarRegistro();
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

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
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
        if(respuestas.length > 0) {
          contexto.controlador.agregarPregunta(pregunta, respuestas);
          contexto.limpiarFormulario();
        } else {
          alert('No pusiste ninguna respuesta guach');
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

  },

  mostrarRegistro: function() {
    var contexto = this;
    var pantalla = contexto.elementos.registroDeVotantes;
    //contexto.controlador.mostrarRegistro(registroPantalla);
    var registro = contexto.modelo.registroUsuarios;
    registro.forEach(function(usuario) {
      pantalla.append($('<li>', {
        text: usuario.usuario + ' respondio: ' + '"' + usuario.respuesta + '"' + ' a la pregunta ' + '"' + usuario.pregunta + '"' 
      }));
    });

  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
