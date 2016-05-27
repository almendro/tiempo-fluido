/* 

Tiempo Fluido
-------------

Martín Ochoa
2016-03-17

Grilla

*/


var tiempoFluido = window.tiempoFluido || {};

tiempoFluido.grilla = (function($){

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

trace("cargado grilla.js");

/* fin js */
