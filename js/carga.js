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

       alert ('iniciamos la CARGA');
    },

    hideDialog : function (){

       alert ('hideDialog');
      $(".dialog").fadeOut(300);
    }
  };

  return carga;

})(jQuery);

alert("cargado carga.js");

/* fin js */
