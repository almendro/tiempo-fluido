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
        configuracionCarga,
        preferenciasDefault;
        
    /* data input/output e interfaz usuario */
    var io, ui;
    
    /* datos */
    var libreria;
    var grillaJornada;
    var cargaActual;
    var jornadaActual;

    var seccionActual , 
        subseccionActual , 
        seccionSiguiente , 
        subseccionSiguiente ;
    
    /* botones enviar 
    para capturar todos los botones de los formularios
    */
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
        
        preferenciasDefault = {
          tiempo_por_jornada: 7*60,
          tiempo_intercargas: 5,
          reserva_contingencias: 2*60,
          tiempo_minimo: 20
          dias:[1,1,1,1,1,0,0] // semana inicia lunes
        };
        
        /* Dev  */
        var tmp = io.borrarTodo();
       
        
        $botonesEnviar = jQuery( "button.enviar" );
        ui.ocultarSeccion(); /* CAMBIAR a ocultarSecciones */

        perfil = io.cargarPerfil();
        
        if ( perfil==false )
        {
          /* En este punto no hay definido un perfil por lo cual iniciamos la configuracion de uno y luego las preferencias */
          trace("crear perfil");
          seccionActual = "configuracion";
          subseccionActual = "perfil";
          seccionSiguiente = "inicio";
          subseccionSiguiente = "bienvenida";
          ui.mostrarSeccion( seccionActual );
          habilitarFormulario( subseccionActual , seccionActual , function (){
            trace("mostrar " + seccionSiguiente + " " + subseccionSiguiente );
            ui.mostrarSeccion ( "inicio" );
            ui.mostrarSubseccion ( "bienvenida" );
          }); // CAMBIAR agregar forma de procesar para seguimiento
        } 
        else 
        {
          trace( "presentamos el perfil: " + perfil.id + " " + perfil.nombre + " " + perfil.alias + " " + perfil.email );
          configuracionAplicacion = io.cargarConfiguracionAplicacion(perfil.id);
          trace("configuracionAplicacion = "+configuracionAplicacion);
        }
        
        
        /* tiempoFluido.io.init(); */
        
        $('#btn_agregar_carga').bind('click',agregarCarga);
        $('#btn_ver_grilla').bind('click',verGrilla);

    }; /* this.iniciar */

    var habilitarFormulario = function( formulario ,  seccion , callback ){
      
      trace('habilitarFormulario: '+formulario+" "+seccion);
      //trace("callback " + callback);
      deshabilitarBotonesEnviar();
      ui.ocultarSubsecciones();
      ui.mostrarSubseccion(formulario);
      jQuery( ".enviar" , jQuery( "#"+formulario ) ).bind( 'click.misEventos', { formulario: formulario, callback: callback }, enviarDatos );
      //return true; // tmp
    };
    
    var enviarDatos = function (evento){
      deshabilitarBotonesEnviar();
      var formulario = evento.data.formulario;
      var callback = evento.data.callback;
      trace( "enviarDatos: " + formulario );
      //trace( "callback " + callback );
      //var objeto = eval(evento.data.form);
      //trace('objeto.ID = '+objeto["id"]);
      //return
       io.salvarDatos( formulario , callback );
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
