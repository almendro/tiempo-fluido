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

       alert ('iniciamos la GRILLA');
    },

    hideDialog : function (){

       alert ('hideDialog');
      $(".dialog").fadeOut(300);
    }
  };

  return grilla;

})(jQuery);

alert("cargado oi.js");

/* fin js */
