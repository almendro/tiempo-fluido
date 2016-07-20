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
        valoresPorDefecto;
  
    /* data input/output e interfaz usuario */
    var io, ui;
    
    /* referencias a las class objects */
    var Carga, Jornada, Grilla;

    /* datos */
    var biblioteca;
    var grillaJornada;
    var cargaActual;
    var jornadaActual;
    
    var dias_nombres;

    var estado, miEstado;
    
    /* botones enviar 
    para capturar todos los botones de los formularios
    */
    var $botonesEnviar,
        $secciones,
        $subsecciones;
        
    var seccionActual , 
        subseccionActual , 
        seccionSiguiente , 
        subseccionSiguiente ;
           
    var TF_MODO_FLUIDO = 0;
    
    var dev; /* Opciones de desarrollador */
    
    this.iniciar = function(){
        
        /*
        Referenciar los módulos e inicializarlos
        */
        
        ui = tiempoFluido.ui;
        ui.iniciar();
        
        io = tiempoFluido.io;
        io.iniciar();
        
        dev = tiempoFluido.dev;
        dev.iniciar();
        
        Carga = tiempoFluido.Carga;
        
        /* fin iniciar módulos */
        
        trace("*** cargamos configuracion guardada ***");
        /*
        tiempoPorDia,
        tiempoIntercargas,
        resevaContingencias;
        */

        perfil = {
          id: "",
          nombre:"",
          alias: "",
          email: ""
        };
        
        configuracion = {
            preferencias: {},
            otras: {}
        };
        
        valoresPorDefecto = {
          configuracion : {
            preferencias : {
              tiempoPorJornada: 7*60, /* minutos */
              tiempoIntercargas: 5, /* minutos */
              reservaContingencias: 2*60, /* minutos */
              tiempoMinimo: 20, /* minutos */
              diasDeSemana: /* */
              {
                lun: true,
                mar: true,
                mie: true,
                jue: true,
                vie: true,
                sab: false,
                dom: false
              }
            },
            otras : {
              modo: TF_MODO_FLUIDO
            }
          } /* /configuracion */
        };
        
        
        diasDeSemanaNombresCortos = [
          "lun", "mar", "mie", "jue", "vie", "sab", "dom"
        ];

        $secciones = $( "#seccion" );
        $subsecciones = $( ".subseccion" );
        $botonesEnviar = $( ".enviar" );
        //ui.ocultarSeccion(); /* CAMBIAR a ocultarSecciones */

        trace( "Preprocesamos las subsecciones ..." );
        $subsecciones.each(function(e){
          var $soy = $(this);
          var $miPlantilla;
          var $enviar;
          trace("seccion "+$soy.attr("id"));
          if ( $soy.attr("data-plantilla") ){
            trace( "hay plantilla" );
            $miPlantilla = ui.aplicarPlantilla({
              $subseccion: $soy
            });
          }
        });
        // ACA COMIENZA LA POSTA
        
        
        perfil = io.cargarPerfil();
        estado( perfil==false ? "SIN_PERFIL" : "PERFIL" );
        
        if ( estado() == "SIN_PERFIL" ) // COMPROBAR CONTRA perfil.id
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
          
          ui.deshabilitarSubseccion([
            "preferencias",
            "otras"
          ]);
          
          ui.deshabilitarSeccion([
            "agregar_carga",
            "ver_jornada",
            "ver_grilla"
          ]);
          
          ui.mostrarMensajeSeccion( "#bienvenida", estado() );
          
          habilitarFormulario({
            formulario: subseccionActual , 
            seccion: seccionActual , 
            callback: function( datosPerfil ){
              /* 
              Obtener datos para generar el perfil 
              y luego salvarlos
            
              (habría que poner un control para que no llegue false)
              */
              perfil = generarId(datosPerfil);
              io.salvarDatos({
                datos: perfil , 
                objetoStorage: "perfil" ,
                callback: function(){ 
                /*
                Mostrar pantalla de Bienvenida
                */
                
                estado( "SIN_CONFIGURACION" );
                
                ui.habilitarSubseccion([
                  "preferencias",
                  "otras"
                ]);
                /*
                ui.habilitarSeccion([
                 "agregar_carga",
                 "ver_jornada",
                 "ver_grilla"
                ]);
                */
                bienvenida();
                } /* /callback */
              }); /* /io.salvarDatos */
            } /* /callback */
          }); /* /habilitarFormulario */
        } 
        else 
        {
          /*
          En este punto hay definido un perfil,
          pero comprobamos si están definidas
          las preferencias generales de tiempo.
          Si hay preferencias arrancamos normal.
          Populamos los formularios con los datos.
          */
          trace( "presentamos el perfil: " + perfil.id + " " + perfil.nombre + " " + perfil.alias + " " + perfil.email );
          
          configuracion = io.cargarConfiguracion( perfil.id );
          
          estado( configuracion==false ? "SIN_CONFIGURACION" : "CONFIGURADO" );
          
          configuracion = $.extend(
            {},
            valoresPorDefecto.configuracion,
            configuracion
          );
          trace( "configuracion = " + JSON.stringify(configuracion) );
          
          trace( "Popular formularios ..." );
          ui.ponerDatos ({
            form: "#perfil",
            data: perfil 
          });
          ui.ponerDatos ({
            form: "#preferencias",
            data: configuracion['preferencias']
          });
          ui.ponerDatos ({
            form: "#otras",
            data: configuracion['otras']
          });
          
          if ( estado()=="SIN_CONFIGURACION" ){
            trace('mostrar aviso de SIN_CONFIGURACION');
            bienvenida();
          }        
          else
          {
            comenzar();
          }
        }
    }; /* this.iniciar */
    
    var estado = function(p) {
      if (p==undefined) {
        trace ("consulta estado: "+miEstado);
        return miEstado;
      }
      if ( typeof p === "string" ){
        miEstado = p;
        trace ("establece estado: "+miEstado);
        return;
      }
      trace("estado: ¡¡¡Fruta!!!");
      return false;
    }; /* /estado */
    
    var generarId = function ( datosPerfil ) {
      var id = datosPerfil.email;
      id = replaceAll( id, "." , "_dot_" );
      id = replaceAll( id, "@" , "_at_" );
      trace(" generarId: "+id);
      datosPerfil[ "id" ] = id;
      return datosPerfil;
    }; /* /generarId */

    /* control de pantallas */
    
    var bienvenida = function () {
      ui.mostrarSeccion ( "inicio" );
      ui.mostrarSubseccion ( "bienvenida" );
      $( '.valor.perfil.nombre' ).text( perfil.nombre );
      $( '.valor.perfil.id' ).text( perfil.id );
      $( '#btn_comenzar_ya' ).bind( 'click.misEventos' , comenzarYa );
      $( '#btn_configurar_preferencias' ).bind( 'click.misEventos' , configurarPreferencias );
      /*
      ui.verPreferencias ({
        datos: valoresPorDefecto.preferencias,
        div: "#valores_defecto",
        prefijo: "valor_"
      });
      */
      ui.mostrarMensajeSeccion("#bienvenida", estado() );
    }; /* bienvenida */

    var comenzarYa = function () {
      trace("comenzarYa: ");
    }; /* comenzarYa */
 
    var comenzar = function () {
      trace("comenzar: ");
    }; /* comenzar */

       
    var configurarPreferencias = function () {
       trace("configurarPreferencias: ");      
       ui.mostrarSeccion( "configuracion" );
       /*
       ui.ponerDatos ({
           form: "#preferencias",
           data: 
             configuracion['preferencias'] == false ? 
             valoresPorDefecto.preferencias : configuracion['preferencias'] 
       });
       */
       habilitarFormulario({
         formulario: "preferencias" ,
         seccion: "configuracion" ,
         callback: function( datosPreferencias ){
           /*
           datosPreferencias es la devolucion
           del formulario cuando el usuario
           presiona el boton de ENVIAR
           
           salvamos los datos en el objeto del 
           id del perfil actual.
           */
           configuracion["preferencias"] = datosPreferencias;
           //configuracion["otras"] = io.obtenerDatosFormulario( "otras" );
         
           io.salvarDatos({
             datos: datosPreferencias , 
             objetoStorage: perfil.id+".configuracion.preferencias" ,
             callback: function(){ 
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
                datos: valoresPorDefecto.preferencias,
                div: "#valores_defecto",
                prefijo: "valor_"
              });
              */
            }/* /callback */
          }); /* io.salvarDatos */
        }/* /callback */
      }); /* habilitarFormulario */
    }; /* configurarPreferencias */
    
    
    var habilitarFormulario = function(p){
      /*
      Establece las acciones del boton enviar
      */
      trace('habilitarFormulario: '+p.formulario+" "+p.seccion);
      
      //deshabilitarBotonesEnviar();
      //ui.mostrarSubseccion(p.formulario);
      $( 
        ".enviar" , 
        $( "#"+p.formulario ) 
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
   
  };/* /aplicacion */

  return aplicacion;

})(jQuery,moment);

trace("cargado tiempo_fluido.js");
/* fin js */
