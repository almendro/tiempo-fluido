/* 

Tiempo Fluido
-------------

Martín Ochoa
2016-03-17


*/


var tiempoFluido = window.tiempoFluido || {};

tiempoFluido.aplicacion = (function($,moment){

  var aplicacion = function(){

    trace('iniciamos la aplicación');

    /* configuracion */
    var perfil, configuracionAplicacion, configuracionCarga;
    
    /* data e interfaz usuario */
    var io, ui;
    
    /* datos */
    var libreria;
    var grillaJornada;
    var cargaActual;
    var jornadaActual;
    
    /* botones enviar */
    var $botonesEnviar = jQuery("input.enviar");

    this.iniciar = function(){
    
        trace("*** cargamos configuracion guardada ***");
        /*
        tiempoPorDia,
        tiempoIntercargas,
        resevaContingencias;
        */
        ui = tiempoFluido.ui;
        io = new tiempoFluido.io();

        ui.ocultarPantallas();

        perfil = io.cargarPerfil();
        if (perfil==false){
          trace("crear perfil");
          ui.mostrarPantalla("configuracion");
          oi.habilitarFormulario("perfil","configuracion");
        } else {
          trace("presentamos el perfil: "+perfil.id+" "+perfil.email+" "+perfil.nombre);
          configuracionAplicacion = io.cargarConfiguracionAplicacion(perfil.id);
          trace("configuracionAplicacion = "+configuracionAplicacion);
        }
        
        
        /* tiempoFluido.io.init(); */
        
        $('#btn_agregar_carga').bind('click',agregarCarga);
        $('#btn_ver_grilla').bind('click',verGrilla);

    }; /* this.iniciar */

    var habilitarFormulario = function(formulario, pantalla){

       trace('IO: habilitarFormulario');
       deshabilitarBotonesEnviar();
       /* SEGUIR AQUI ... 
       asociar al boton enviar el evento para la función que
       tomara los datos de los campos y los enviara a IO para almacenar.
       */
       return false; // tmp
    };
    
    var deshabilitarBotonesEnviar = function(){
      $botonesEnviar.unbind("click.misEventos");
    }
    
    var agregarCarga = function(){
      trace("agregarCarga");
    }
    
    var verGrilla = function(){
      trace("verGrilla");
    }
  };

  return aplicacion;

})(jQuery,moment);

trace("cargado tiempo_fluido.js");
/* fin js */
