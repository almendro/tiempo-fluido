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

    ocultarDialogos : function (){
      trace('ocultarDialogos');
      $(".dialogo").fadeOut(300);
    },
    ocultarSeccion : function (){
      trace('ocultarSeccion');
      $(".seccion").fadeOut(300);
    },
    mostrarSeccion : function (seccion){
      trace('UI: mostrarSeccion'+seccion);
      this.ocultarSeccion();
      $("#"+seccion).fadeIn(300);
    },
    ocultarSubsecciones : function (){
      trace('UI: ocultarSubsecciones');
      $(".subseccion").fadeOut(300);
    },
    mostrarSubseccion : function (subseccion){
      trace('UI: mostrarSubseccion '+subseccion);
      this.ocultarSubsecciones();
      $("#"+subseccion).fadeIn(300);
    }
  };
  
  return ui;

})(jQuery);

trace("cargado ui.js");
/* fin js */
