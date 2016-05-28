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

    iniciar : function(){
       trace('iniciamos la UI');
    }, 

    hideDialog : function (){
       trace('hideDialog');
      $(".dialog").fadeOut(300);
    },
    ocultarPantallas : function (){
       trace('ocultarPantallas');
      $(".pantalla").fadeOut(300);
    },
    mostrarPantalla : function (pantalla){
       trace(' mostrarPantalla '+pantalla);
      $("#"+pantalla).fadeIn(300);
    }
  };
  
  return ui;

})(jQuery);

trace("cargado ui.js");
/* fin js */
