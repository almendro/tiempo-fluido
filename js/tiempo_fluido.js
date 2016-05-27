/* 

Tiempo Fluido
-------------

Martín Ochoa
2016-03-17


*/


var tiempoFluido = window.tiempoFluido || {};

tiempoFluido.app = (function($,moment){

  var app = function(){

    alert ('iniciamos la aplicación');

    /* config */
    var tiempoPorDia,
        tiempoIntercargas,
        resevaContingencias;

    trace("cargamos configuracion guardada");
        

    this.inicia = function(){

      tiempoFluido.io.init();
      $('#btn_agregar_carga').bind('click',agregarCarga);
      $('#btn_ver_grilla').bind('click',verGrilla);

    };
    
    var agregarCarga = function(){
      alert("agregarCarga");
    }
    
    var verGrilla = function(){
      alert("verGrilla");
    }
  };

  return app;

})(jQuery,moment);

alert("cargado tiempo_fluido.js");
/* fin js */
