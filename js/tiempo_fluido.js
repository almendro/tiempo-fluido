/* 

Tiempo Fluido
-------------

Martín Ochoa
2016-03-17


*/


var tiempoFluido = window.tiempoFluido || {};

tiempoFluido.app = (function($,moment){

  var app = function(){

    alert ("iniciamos la aplicación");

    this.inicia = function(){
      $("body").css("background-color","#000");
    }
    
  };

  return app;

})(jQuery,moment);


/* fin js */
