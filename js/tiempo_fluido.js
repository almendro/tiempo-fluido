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
    
    var dias_nombres;

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
          tiempoPorJornada: 7*60, /* minutos */
          tiempoIntercargas: 5, /* minutos */
          reservaContingencias: 2*60, /* minutos */
          tiempoMinimo: 20, /* minutos */
          diasDeSemana:[1,1,1,1,1,0,0] /* semana inicia lunes */
        };
        
        diasDeSemanaNombresCortos = [
          "lun", "mar", "mie", "jue", "vie", "sab", "dom"
        ];

        
        /* Dev  */
        var tmp = io.borrarTodo();
       
        
        $botonesEnviar = jQuery( "button.enviar" );
        //ui.ocultarSeccion(); /* CAMBIAR a ocultarSecciones */

        perfil = io.cargarPerfil();
        
        if ( perfil==false )
        {
          /*
          En este punto no hay definido un perfil 
          por lo cual iniciamos la configuracion de uno 
          y luego ofrecemos la posibilidad de
          establecer las preferencias generales
          o iniciar con los valores por defecto
          */
          trace("crear perfil");
          seccionActual = "configuracion";
          subseccionActual = "perfil";
          seccionSiguiente = "inicio";
          subseccionSiguiente = "bienvenida";
          ui.mostrarSeccion( seccionActual );
          habilitarFormulario( subseccionActual , seccionActual , function( datosPerfil ){
            /* 
            Obtener datos para generar el perfil 
            y luego salvarlos
            
            (habría que poner un control para que no llegue false)
            */
            datosPerfil = generarId(datosPerfil);
            io.salvarDatos( datosPerfil , "perfil" , function(){ 
              /*
              Mostrar pantalla de Bienvenida
              */
              trace("mostrar " + seccionSiguiente + " " + subseccionSiguiente );
              ui.mostrarSeccion ( "inicio" );
              ui.mostrarSubseccion ( "bienvenida" );
              $( '#btn_comenzar_ya' ).bind( 'click.misEventos' , comenzarYa );
              $( '#btn_configurar_preferencias' ).bind( 'click.misEventos' , configurarPreferencias );
              ui.verPreferencias ({
                datos: preferenciasDefault,
                div: "#valores_defecto",
                prefijo: "valor_"
              });
            });
          });
        } 
        else 
        {
          trace( "presentamos el perfil: " + perfil.id + " " + perfil.nombre + " " + perfil.alias + " " + perfil.email );
          configuracionAplicacion = io.cargarConfiguracionAplicacion(perfil.id);
          trace("configuracionAplicacion = "+configuracionAplicacion);
        }
        
        
        /* tiempoFluido.io.init(); */
        
/*        $('#btn_agregar_carga').bind('click',agregarCarga);
        $('#btn_ver_grilla').bind('click',verGrilla);
*/
    }; /* this.iniciar */
    
    var generarId = function ( datosPerfil ) {
      var id = datosPerfil.email;
      id = replaceAll( id, "." , "_dot_" );
      id = replaceAll( id, "@" , "_at_" );
      trace(" generarId: "+id);
      datosPerfil[ "id" ] = id;
      return datosPerfil;
    };
    
    var replaceAll = function( string, omit, place, prevstring ) {
      if (prevstring && string === prevstring)
        return string;
      prevstring = string.replace(omit, place);
      return replaceAll(prevstring, omit, place, string)
    };
    /* http://stackoverflow.com/a/22870785  */
    
    var comenzarYa = function () {
      trace("comenzarYa: ");
    }; /* comenzarYa */
 
       
    var configurarPreferencias = function () {
       trace("configurarPreferencias: ");
    }; /* configurarPreferencias */
    
    
    var habilitarFormulario = function( formulario ,  seccion , callback ){
      
      trace('habilitarFormulario: '+formulario+" "+seccion);
      //trace("callback " + callback);
      deshabilitarBotonesEnviar();
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
      io.obtenerDatosFormulario( formulario , callback );
      // io.salvarDatos( formulario , callback );
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
