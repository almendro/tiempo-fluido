/* 

Tiempo Fluido
-------------

Martín Ochoa
2016-03-17

User interface

*/


var tiempoFluido = window.tiempoFluido || {};

tiempoFluido.ui = (function($){

  var ui = {

    init : function(){

       alert ('iniciamos la UI');
    },

    hideDialog : function (){

       alert ('hideDialog');
      $(".dialog").fadeOut(300);
    }
  };
  
  return ui;

})(jQuery);

alert("cargado ui.js");
/* fin js */
