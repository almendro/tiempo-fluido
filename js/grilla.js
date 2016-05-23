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

       alert ('iniciamos la GRILLA');
    },

    hideDialog : function (){

       alert ('hideDialog');
      $(".dialog").fadeOut(300);
    }
  };

  return grilla;

})(jQuery);

alert("cargado grilla.js");

/* fin js */
