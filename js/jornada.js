/* 

Tiempo Fluido
-------------

Martín Ochoa
2016-03-17

Jornada

*/


var tiempoFluido = window.tiempoFluido || {};

tiempoFluido.jornada = (function($){

  var jornada = {

    init : function(){

       trace('iniciamos la JORNADA');
    },

    hideDialog : function (){

       trace('hideDialog');
      $(".dialog").fadeOut(300);
    }
  };

  return jornada;

})(jQuery);

trace("cargado jornada.js");

/* fin js */
