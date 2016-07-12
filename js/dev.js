/* 

Tiempo Fluido
-------------

Martín Ochoa
2016-03-17

Dev 2016-07-05

*/


var tiempoFluido = window.tiempoFluido || {};

tiempoFluido.dev = (function($){

  var dev = {
    iniciar : function(){

      trace('iniciamos Dev');
      
      $("#dev_borrar_todo").bind(
        "click.misEventos",
        {soy: "#dev_borrar_todo"},
        this.borrarTodo
      );
    } /* /iniciar */
    ,
    
    borrarTodo: function(e){
      trace( "DEV: borrarTodo "+e.data.soy );
      tiempoFluido.ui.mostrarDialogoConfirmar({
        target: e.data.soy,
        mensaje: "Borrar todos los datos ¿Estás seguro?",
        callbackSi: function(e){
          trace("Si");
          tiempoFluido.io.borrarTodo();
          /*
          $( document ).on( 
            "popupafterclose", 
            e.data.$dialogo, 
            function() {
              $( this ).remove();
            }
          );*/
          
          e.data.$dialogo.remove();
          /*
          tiempoFluido.ui.mostrarDialogoResultado({
            target: e.data.soy,
            mensaje: "Todos los datos locales fueron borrados."
          })
          */
        },
        callbackNo: function(e){
          trace("Cancelar");
          /*
          $( document ).on( 
            "popupafterclose", 
            e.data.$dialogo, 
            function() {
              $( this ).remove();
            }
          );
          */
          e.data.$dialogo.remove();
        }
      }); /* /mostrarDialogoConfirmar */
    } /* /borrarTodo */

  }; /* /var dev */

  return dev;

})(jQuery); /* /tiempoFluido.dev */

trace("cargado dev.js");

/* fin js */
