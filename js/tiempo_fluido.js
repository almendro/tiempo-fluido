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
    var perfil, 
        configuracionAplicacion, 
        configuracionCarga;
        
    /* data input/output e interfaz usuario */
    var io, ui;
    
    /* datos */
    var libreria;
    var grillaJornada;
    var cargaActual;
    var jornadaActual;
    
    /* botones enviar */
    var $botonesEnviar;

    this.iniciar = function(){
    
        trace("*** cargamos configuracion guardada ***");
        /*
        tiempoPorDia,
        tiempoIntercargas,
        resevaContingencias;
        */
        ui = tiempoFluido.ui;
        io = new tiempoFluido.io();

        perfil = {
          id: "",
          nombre:"",
          alias: "",
          email: ""
        };
        
        $botonesEnviar = jQuery( "button.enviar" );
        ui.ocultarSeccion(); /* CAMBIAR a ocultarSecciones */

        perfil = io.cargarPerfil();
        if ( perfil==false ){
          trace("crear perfil");
          ui.mostrarSeccion("configuracion");
          habilitarFormulario( "perfil" , "configuracion" ); // CAMBIAR agregar forma de procesar para seguimiento
        } else {
          trace( "presentamos el perfil: " + perfil.id + " " + perfil.nombre + " " + perfil.alias + " " + perfil.email );
          configuracionAplicacion = io.cargarConfiguracionAplicacion(perfil.id);
          trace("configuracionAplicacion = "+configuracionAplicacion);
        }
        
        
        /* tiempoFluido.io.init(); */
        
        $('#btn_agregar_carga').bind('click',agregarCarga);
        $('#btn_ver_grilla').bind('click',verGrilla);

    }; /* this.iniciar */

    var habilitarFormulario = function(formulario, seccion){
      
      trace('habilitarFormulario: '+formulario+" "+seccion);
      deshabilitarBotonesEnviar();
      ui.ocultarSubsecciones();
      ui.mostrarSubseccion(formulario);
      jQuery(".enviar",jQuery("#"+formulario)).bind('click.misEventos', {form: formulario}, enviarDatos);
      return false; // tmp
    };
    
    var enviarDatos = function (evento){
      trace("enviarDatos: "+evento.data.form);
      deshabilitarBotonesEnviar();
      var formulario = evento.data.form;
      //var objeto = eval(evento.data.form);
      //trace('objeto.ID = '+objeto["id"]);
      io.salvarDatos(formulario);
      //eval(evento.data.form) = io.salvarDatos(evento.data.form,eval(evento.data.form));
      //eval(evento.data.form) = io.salvarDatos(evento.data.form,eval(evento.data.form));
    };
    
    var deshabilitarBotonesEnviar = function(){
      $botonesEnviar.unbind("click.misEventos");
    };
    
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
