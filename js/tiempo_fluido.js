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
    var profile, configApp, configCarga;
    var io, ui;
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
        ui = tiempoFluido.ui;
        io = new tiempoFluido.io();

        ui.ocultarPantallas();

        profile = io.getProfile();
        if (profile==false){
          trace("crear perfil");
          ui.mostrarPantalla("config");
          oi.habilitarForm("config");
        } else {
          trace("presentamos el perfil: "+profile.id+" "+profile.email+" "+profile.name);
          configApp = io.getConfigApp(profile.id);
        
          trace("configApp = "+configApp);
        }
        
        
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
