/* 

Tiempo Fluido
-------------

Martín Ochoa
2016-03-17


*/


var tiempoFluido = window.tiempoFluido || {};

tiempoFluido.app = (function($,moment){

  var app = function(){

    trace('iniciamos la aplicación');

    /* configuracion */
    var configApp, configCarga;
    var io;
    var libreria;
    var grillaJornada;
    var cargaActual;
    var jornadaActual;

    this.inicia = function(){
    
        trace("*** cargamos configuracion guardada ***");
        /*
        tiempoPorDia,
        tiempoIntercargas,
        resevaContingencias;
        */
        
        io = new tiempoFluido.io();
        configApp = io.getConfigApp();
        
        trace("configApp = "+configApp);
        
        //tiempoFluido.io.init();
        
        $('#btn_agregar_carga').bind('click',agregarCarga);
        $('#btn_ver_grilla').bind('click',verGrilla);

    };
    
    var agregarCarga = function(){
      trace("agregarCarga");
    }
    
    var verGrilla = function(){
      trace("verGrilla");
    }
  };

  return app;

})(jQuery,moment);

trace("cargado tiempo_fluido.js");
/* fin js */
