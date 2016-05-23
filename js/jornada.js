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

       alert ('iniciamos la JORNADA');
    },

    hideDialog : function (){

       alert ('hideDialog');
      $(".dialog").fadeOut(300);
    }
  };

  return jornada;

})(jQuery);

alert("cargado jornada.js");

/* fin js */
