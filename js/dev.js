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
        this.borrarTodo
      );
    },
    
    borrarTodo: function(){
      trace( "DEV: borrarTodo" );
      
    }

  }; /* /var dev */

  return dev;

})(jQuery); /* /tiempoFluido.dev */

trace("cargado dev.js");

/* fin js */
