/* 

Tiempo Fluido
-------------

Martín Ochoa
2016-03-17

input/output data

*/


var tiempoFluido = window.tiempoFluido || {};

tiempoFluido.io = (function($){

  var grilla = {

    init : function(){

       trace('iniciamos la GRILLA');
    },

    hideDialog : function (){

       trace('hideDialog');
      $(".dialog").fadeOut(300);
    }
  };

  return grilla;

})(jQuery);

trace("cargado oi.js");

/* fin js */
