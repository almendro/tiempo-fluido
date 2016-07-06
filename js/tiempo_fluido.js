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
    
    var tf; /* objeto con toda la data de usuario */
    
    /* configuracion */
    var perfil,
        configuracion,
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
    
    var dev; /* Opciones de desarrollador */
    
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
        
        /* iniciar módulos */
        
        ui = tiempoFluido.ui;
        ui.iniciar();
        
        io = new tiempoFluido.io();

        dev = tiempoFluido.dev;
        dev.iniciar();
        
        /* fin iniciar módulos */
        
        perfil = {
          id: "",
          nombre:"",
          alias: "",
          email: ""
        };
        
        configuracion = {};
        
        preferenciasDefault = {
          tiempoPorJornada: 7*60, /* minutos */
          tiempoIntercargas: 5, /* minutos */
          reservaContingencias: 2*60, /* minutos */
          tiempoMinimo: 20, /* minutos */
          diasDeSemana: /* [1,1,1,1,1,0,0] semana inicia lunes */
            {
                lun: true,
                mar: true,
                mie: true,
                jue: true,
                vie: true,
                sab: false,
                dom: false
            }
        };
        
        diasDeSemanaNombresCortos = [
          "lun", "mar", "mie", "jue", "vie", "sab", "dom"
        ];

        
        /* Dev  */
        //var tmp = io.borrarTodo();

        $botonesEnviar = jQuery( "button.enviar" );
        //ui.ocultarSeccion(); /* CAMBIAR a ocultarSecciones */

        perfil = io.cargarPerfil();
        
        /*DEV*/
        //var tmp = io.borrarObjeto(perfil.id+".preferencias");
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

          ui.mostrarSeccion( seccionActual );
          ui.deshabilitarSubseccion("preferencias");
          
          habilitarFormulario({
            formulario: subseccionActual , 
            seccion: seccionActual , 
            callback: function( datosPerfil ){
              /* 
              Obtener datos para generar el perfil 
              y luego salvarlos
            
              (habría que poner un control para que no llegue false)
              */
              // perfil = 
              generarId(datosPerfil);
              io.salvarDatos( datosPerfil , "perfil" , function(){ 
                /*
                Mostrar pantalla de Bienvenida
                */
                configuracion['preferencias'] = false;
                bienvenida("primeraVez");
              }); /* io.salvarDatos */
            } /* / callback */
          }); /* habilitarFormulario */
        } 
        else 
        {
          trace( "presentamos el perfil: " + perfil.id + " " + perfil.nombre + " " + perfil.alias + " " + perfil.email );
          configuracion['preferencias'] = io.cargarPreferencias( perfil.id );
          trace( "configuracion['preferencias'] = " + JSON.stringify(configuracion.preferencias) );
          if (configuracion.preferencias==false){
            trace('mostrar aviso de no configuracion');
            bienvenida();
          }
          else
          {
            comenzarYa();
          }
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

    /* control de pantallas */
    
    var bienvenida = function (primeraVez) {
              ui.mostrarSeccion ( "inicio" );
              ui.mostrarSubseccion ( "bienvenida" );
              $( '.valor.nombre' ).text( perfil.nombre );
              $( '.valor.id' ).text( perfil.id );
              $( '#btn_comenzar_ya' ).bind( 'click.misEventos' , comenzarYa );
              $( '#btn_configurar_preferencias' ).bind( 'click.misEventos' , configurarPreferencias );
              ui.verPreferencias ({
                datos: preferenciasDefault,
                div: "#valores_defecto",
                prefijo: "valor_"
              });
              if(primeraVez=="primeraVez"){
                  $("#primeraVez").show();
                  $("#noHayPreferencias").hide();
              } else {
                  $("#primeraVez").hide();
                  $("#noHayPreferencias").show();
              }
    }; /* bienvenida */

    var comenzarYa = function () {
      trace("comenzarYa: ");
    }; /* comenzarYa */
 
       
    var configurarPreferencias = function () {
       trace("configurarPreferencias: ");
       ui.mostrarSeccion( "configuracion" );
       ui.ponerDatos ({
           form: "#preferencias",
           data: 
             configuracion['preferencias'] == false ? 
             preferenciasDefault : configuracion['preferencias'] 
       });
       habilitarFormulario( "preferencias" , "configuracion" , function( datosPreferencias ){
         /*
         salvamos los datos en el objeto del 
         id del perfil actual.
         */
         io.salvarDatos( datosPreferencias , perfil.id+".preferencias" , function(){ 
              /*
              Mostrar pantalla de inicio
              */
              
              trace("mostrar pantalla de inicio" );
              ui.mostrarSeccion ( "inicio" );
              /*
              ui.mostrarSubseccion ( "bienvenida" );
              $( '#btn_comenzar_ya' ).bind( 'click.misEventos' , comenzarYa );
              $( '#btn_configurar_preferencias' ).bind( 'click.misEventos' , configurarPreferencias );
              ui.verPreferencias ({
                datos: preferenciasDefault,
                div: "#valores_defecto",
                prefijo: "valor_"
              });
              */
        }); /* io.salvarDatos */
      }); /* habilitarFormulario */
    }; /* configurarPreferencias */
    
    
    var habilitarFormulario = function(p){
        
      trace('habilitarFormulario: '+p.formulario+" "+p.seccion);
      
      deshabilitarBotonesEnviar();
      ui.mostrarSubseccion(p.formulario);
      jQuery( 
        ".enviar" , 
        jQuery( "#"+p.formulario ) 
      ).bind( 
        'click.misEventos', 
        { /* parametros para enviarDatos */
          formulario: p.formulario, 
          callback: p.callback 
        },
        enviarDatos 
      );
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
