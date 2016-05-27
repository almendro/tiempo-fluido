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

       trace('iniciamos la UI');
    },

    hideDialog : function (){

       trace('hideDialog');
      $(".dialog").fadeOut(300);
    }
  };
  
  return ui;

})(jQuery);

trace("cargado ui.js");
/* fin js */
