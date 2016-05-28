/* 

Tiempo Fluido
-------------

Martín Ochoa
2016-03-17

Carga

*/


var tiempoFluido = window.tiempoFluido || {};

tiempoFluido.carga = (function($){

  var carga = {

    init : function(){

       trace('iniciamos la CARGA');
    },

    hideDialog : function (){

       trace('hideDialog');
      $(".dialog").fadeOut(300);
    }
  };

  return carga;

})(jQuery);

trace("cargado carga.js");

/* fin js */
