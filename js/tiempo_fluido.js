/* 

Tiempo Fluido
-------------

Martín Ochoa
2016-03-17


*/


var tiempoFluido = window.tiempoFluido || {};

tiempoFluido.aplicacion = (function($,moment){

  var aplicacion = function(){

    trace('instancia: aplicación');
    trace('variables y objetos');
    
    /* principales */
    var perfil,
        configuracion,
        valoresPorDefecto;
    
    var datos; /* objeto con toda la data de usuario */
    
    /* data input/output e interfaz usuario */
    var io, ui;
    
    /* referencias a las class objects */
    //var Carga, Jornada, Grilla;

    /* datos */
    var biblioteca;
    var grillaActual;
    var cargaActual;
    var jornadaActual;
    var hoy;
    
    var diasNombres;
    var texto;

    var estado, miEstado;
    
    /* botones enviar 
    para capturar todos los botones de los formularios
    */
    var $botonesEnviar,
        $secciones,
        $subsecciones;
        
    var estoyEn,
        seccionActual , 
        subseccionActual , 
        seccionSiguiente , 
        subseccionSiguiente ;
        
    var TF_MODO_FLUIDO = 0;
    
    //var dev; /* Opciones de desarrollador */
    
    this.iniciar = function(){
        trace('iniciamos la aplicación');
        /*
        Referenciar los módulos e inicializarlos
        */
        
        ui = tiempoFluido.ui;
        ui.iniciar();
        
        io = tiempoFluido.io;
        io.iniciar();
        
        //dev = tiempoFluido.dev;
        //dev.iniciar();
        
        //Carga = tiempoFluido.Carga;
        
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
        
        hoy = moment().format("YYYYMMDD");
        //hoy=0;
        
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
            ,
            vista: {
              cargas:{
                id: true,
                titulo: true,
                cantidad: true,
                duracion: true,
                fechaIni: true,
                fechaFin: true,
                fija: true,
                uniforme: false,
                continua: false,
                distribucion: false,
                patron: false,
                contenedor: false,
                contenidos: false,
                prioridad: false,
                recurrente: false,
                responsable: false,
                equipo: false,
                resto: true
              }
            }
          } /* /configuracion */
          ,
          carga : {
            id: "0",
            titulo: "",
            cantidad: 20,
            duracion: 1,
            fechaIni: "",
            fechaFin: "",
            fija: false,
            uniforme: true,
            continua: true,
            distribucion: [0],
            patron: [0],
            contenedor: "", // string 
            contenidos: [], // array
            prioridad: 5,
            recurrente: false,
            responsable: "", // string
            equipo: [], // array
            resto: 20
          },
          datos : {
            cargas: {},
            idClaveCarga: -1,
            jornadas: {},
            grillas: {}
          }
        };
        
        texto = {
          carga: {
            id: "ID",
            titulo: "Título",
            cantidad: "Cantidad",
            duracion: "Duración",
            fechaIni: "Fecha Inicio",
            fechaFin: "Fecha Fin",
            fija: "Fija",
            uniforme: "Uniforme",
            continua: "Contínua",
            distribucion: "Distribución",
            patron: "Patrón",
            contenedor: "Contenedor",
            contenidos: "Contenidos",
            prioridad: "Prioridad",
            recurrente: "Recurrente",
            responsable: "Responsable",
            equipo: "Equipo",
            resto: "Resto"
          }
          ,
          dias: {
            cortos: [
              "lun", "mar", "mie", "jue", "vie", "sab", "dom"
            ],
            largos: [
              "lunes", "martes", "miércoles","jueves","viernes","sábado","domingo"
            ]
          }
        }; /*/texto */
        
        $secciones = $( ".seccion" );
        $subsecciones = $( ".subseccion" );
        $botonesEnviar = $( ".enviar" );
        //ui.ocultarSeccion(); /* CAMBIAR a ocultarSecciones */

        // *** PREPROCESOS ***
        
        trace( "Preprocesamos las subsecciones ..." );
        $subsecciones.each(function(e){
          var $soy = $(this);
          var $miPlantilla;
          var $enviar;
          trace("subseccion: "+$soy.attr("id"));
          if ( $soy.attr("data-plantilla") ){
           trace( "hay plantilla" );
            $miPlantilla = ui.aplicarPlantilla({
              $subseccion: $soy
            });
          }
          /*
          $enviar = $( ".enviar", $miPlantilla );
          $enviar.bind
          */
          if( $("form", $soy).length > 0 ){
            trace("hay form...");
            habilitarFormulario({
              $subseccion: $soy
            });
          } else {
            trace("sin form. Siguiente...");
          }
        });
        
        trace("---");
        trace( "Procesamos las barras de navegacion..." );
        trace("");
        $( "a", $( ".barra" )).each( function(i){
          var $a = $(this);
          var $barra = $a.parents( ".barra" );
          var tipoObjetivo = $barra.attr( "data-tipo-objetivo" );
          
          $a.bind("click.misEventos", function(){
            /* obtenemos el id del destino */
            var id = $a.attr("href").replace("#","");
            irA({
              id: id,
              tipo: tipoObjetivo,
              preprocesarIrA: preprocesarIrA[id] 
              /* referenciamos a la funcion dentro de preprocesarIrA */
            }); /* irA */
          }); /* $a.bind */
        }); /* .each */
        
        $("#dev_borrar_todo").bind(
          "click.misEventos",
          borrarTodo
        );
        
        $("#dev_borrar_cargas").bind(
          "click.misEventos",
          borrarCargas
        );
        
        
        /* Interaccion con el usuario */
        trace(" *** ACA COMIENZA LA POSTA *** ");
        
        perfil = io.cargarPerfil();
        estado( perfil==false ? "SIN_PERFIL" : "PERFIL" );
        
        if ( estado() == "SIN_PERFIL" )
        {
          /*
          En este punto no hay definido un perfil 
          por lo cual iniciamos la configuracion de uno 
          y luego ofrecemos la posibilidad de
          establecer las preferencias generales
          o iniciar con los valores por defecto
          */
          trace("crear perfil");
          
          estoyEn = irA("perfil");
          
          /* dehabilitamos cualquier otra opcion */
          ui.deshabilitarSubseccion([
            "preferencias",
            "otras"
          ]);
          
          ui.deshabilitarSeccion([
            "ver_cargas",
            "ver_jornada",
            "ver_grilla"
          ]);
          
          ui.mostrarMensajeSeccion( "#bienvenida", estado() );
                   
          habilitarFormulario({
            formulario: estoyEn.subseccion,
            callback: function(){
              estado( "SIN_CONFIGURACION" );
            }
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
          
          datos = io.cargarDatos( perfil.id );
          
          if( datos == false )
          {
            trace( "... generar datos por defecto..." );
            datos = $.extend(
              {},
              valoresPorDefecto.datos,
              datos
            );
            io.salvarDatos({
              datos: datos,
              objetoStorage: perfil.id+".datos" ,
              callback: function(p){
                trace("DATOS iniciales salvados...");
              } /* /callback */
            }); /* /io.salvarDatos */
            carga = $.extend(
              {},
              valoresPorDefecto.carga,
              {
                id: idCargaSiguiente(),
                cantidad: configuracion.tiempoMinimo,
                fechaIni: hoy,
                fechaFin: hoy,
                resto: configuracion.tiempoMinimo,
              }
            );
          }
          else
          {
            trace( "Actualizamos estado con los datos cargados..." );
            // aquí plantillas preferidas.
            carga = $.extend(
              {},
              valoresPorDefecto.carga,
              {
                id: datos.idClaveCarga,
                cantidad: configuracion.tiempoMinimo,
                fechaIni: hoy,
                fechaFin: hoy,
                resto: configuracion.tiempoMinimo,
              }
            );
          }
          
          
          
          if ( contar(datos.cargas) > 0 )
          {
            trace("popular listado de cargas");
            ui.listarCargas({
              datos: datos.cargas,
              subseccion: "listarCargas",
              texto: texto
            });
            
            ui.filtrarListado({
              vista: configuracion.vista.cargas
            });
            
          }
          
          
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
    
    var irA = function(p){
      /*
      actualiza la pantalla cambiando entre secciones
      y subsecciones.
      Puede recibir un string con el id de la DIV
      o un object con el id, tipo y preprocesarIrA
      id: string
      tipo: string, indica si se trata de una seccion
      preprocesarIrA: string, por lo general igual a id
      */
      trace("irA :"+p.id);
      var tipo, id;
      trace("typeof p: "+typeof(p));
      if (typeof(p)==="string"){
        id=p;
        tipo = $secciones.filter("#"+id).length == 1 ?
          "seccion" : "subseccion"; 
          /* 
          determina el tipo si existe en los objetos de 
          seccion, de lo contrario se trata de una subseccion
           */
      } else {
        id = p.id;
        tipo = p.tipo;
      }
      /*
      Determina si antes de cambiar de seccion se debe
      pre procesar algun datos o estado llamando a la funcion
      dentro del objeto preprosesarIrA genneral referenciado
      en el parametro.
      */
      if( p.preprocesarIrA != undefined ){
        trace( "preprocesarIrA ...");
        var tmp = p.preprocesarIrA();
        trace( "tmp="+tmp);
      }
      
      var uiMetodo = ui.mostrarSubseccion; 
      if (tipo=="seccion"){
        uiMetodo = ui.mostrarSeccion;
      }
      uiMetodo(id);
      
      var salida;
      /*
      if(p.tipo=="seccion"){
        salida["seccion"] = id;
        salida["subseccion"] = ui.subseccionActivada({seccion:id});
      } else {
        salida = ui.subseccionProp(id);
        salida["subseccion"] = id;
      }
      */
      salida = true;
      
      return (p.callback ) ? p.callback( salida ) : salida;
    }; /* /irA */
    
    var generarId = function ( datosPerfil ) {
      var id = datosPerfil.email;
      id = replaceAll( id, "." , "_dot_" );
      id = replaceAll( id, "@" , "_at_" );
      trace(" generarId: "+id);
      datosPerfil[ "id" ] = id;
      return datosPerfil;
    }; /* /generarId */

    var idCargaSiguiente = function(){
      trace( "idCargaSiguiente: ");
      datos["idClaveCarga"]++;
      trace( "datos.idClaveCarga= "+datos.idClaveCarga);
      return datos.idClaveCarga;
    }; /* /idCargaSiguiente */
    /* control de pantallas */
    
    var bienvenida = function () {

      trace("");
      trace(" --- LA BIENVENIDA ---");
      trace("");
      
      estoyEn = irA( "bienvenida" );
      
      $( '.valor.perfil.nombre' ).text( perfil.nombre );
      $( '.valor.perfil.id' ).text( perfil.id );
      
      $( '#btn_comenzar_ya' ).bind( 'click.misEventos' , comenzarYa );
      //$( '#btn_configurar_preferencias' ).bind( 'click.misEventos' , configurarPreferencias );
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
       estoyEn = irA( "preferencias" );
       //ui.mostrarSeccion( "configuracion" );
       /*
       ui.ponerDatos ({
           form: "#preferencias",
           data: 
             configuracion['preferencias'] == false ? 
             valoresPorDefecto.preferencias : configuracion['preferencias'] 
       });
       * /
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
           * /
           configuracion["preferencias"] = datosPreferencias;
           //configuracion["otras"] = io.obtenerDatosFormulario( "otras" );
         
           io.salvarDatos({
             datos: datosPreferencias , 
             objetoStorage: perfil.id+".configuracion.preferencias" ,
             callback: function(){ 
              /*
              Mostrar pantalla de inicio
              * /
              
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
              * /
            }/* /callback * /
          }); /* io.salvarDatos * /
        }/* /callback * /
      }); /* habilitarFormulario */
    }; /* configurarPreferencias */
    
    
    var habilitarFormulario = function(p){
      /*
      Establece las acciones del boton enviar,
      recibe el objeto jQuery de subseccion
      y el callback de la funcion
      para cuando el botón es presionado
      */
      trace('habilitarFormulario: '+p.$subseccion.attr("id"));
      var salida;
      var enviar_callback = 
        (p.enviar_callback) ? 
        p.enviar_callback :
        habilitarFormularioCallbackGeneral;
      $( ".enviar", p.$subseccion )
      .bind( 
        'click.misEventos',
        function (){
          trace( "enviarDatos: " + p.$subseccion.attr("id") );
          io.obtenerDatosFormulario({
            $subseccion: p.$subseccion,
            callback: enviar_callback
          });
        } /* /function */
      ); /* /.bind */
      
      return (p.callback ) ? p.callback( salida ) : salida;
      
    }; /* /habilitarFormulario */
    
    var habilitarFormularioCallbackGeneral = function( datosDelFormulario ){
      /* 
      Recibimos de io.obtenerDatosFormulario
      los datos para ser ingresados y salvados         
      (habría que poner un control 
      para que no llegue vacio)
      */
      var datosASalvar;
      
      /* preprocesa segun la subseccion */
      datosASalvar = preprocesarDatosASalvar({
        datos: datosDelFormulario.datos,
        subseccion: datosDelFormulario.$subseccion.attr("id")
      });
      trace("...");
      trace(JSON.stringify(datosASalvar));
      trace("...");
      io.salvarDatos({
        datos: datosASalvar.datos , 
        objetoStorage: datosASalvar.objetoStorage ,
        callback: function(p){ 
          /*
          Mostrar resultado de salvar y subseccionSiguente
          */
          trace("DATOS salvados...");
          resultadoPostSalvarFormulario ({
            subseccion: datosDelFormulario.$subseccion.attr("id")
          });
        } /* /callback */
      }); /* /io.salvarDatos */
    } /* /habilitarFormularioCallback */

    var preprocesarDatosASalvar = function(p){
      trace( "preprocesarDatosASalvar "+p.subseccion);
      var salida ={
        datos: {},
        objetoStorage: {}
      };
      
      // ATENCION AQUI PROCESAR X SECTOR
      switch( p.subseccion ){
        case "perfil" :
          salida["datos"][0] = generarId(p.datos);
          salida["objetoStorage"][0]= "perfil";
          break;
        case "preferencias" :
          salida["datos"][0] = p.datos;
          salida["objetoStorage"][0]= perfil.id+".configuracion.preferencias";
          break;
        case "otras" :
          salida["datos"][0] = p.datos;
          salida["objetoStorage"][0]= perfil.id+".configuracion.otras";
          break;
        case "agregarCarga" :
          salida["datos"][0] = $.extend(
            {},
            carga,
            p.datos
          );
          salida["objetoStorage"][0] = perfil.id+".datos.cargas."+p.datos.id;
          salida["datos"][1] = idCargaSiguiente();
          salida["objetoStorage"][1] = perfil.id+".datos.idClaveCarga";
          break;
        case "modificarCarga" :
          salida["datos"][0] = p.datos;
          salida["objetoStorage"][0] = perfil.id+".datos.cargas."+p.datos.id;
          break;
        default:
          break;
      }
      return ( p.callback )? p.callback( salida ) : salida;
    }; /* /preprocesarDatosASalvar */
    
    var resultadoPostSalvarFormulario = function(p){
      trace( "resultadoPostSalvarFormulario: subseccion "+p.subseccion );
      ui.mostrarDialogoResultado({
        target: p.subseccion,
        mensaje: "Los datos del formulario <strong>"+p.subseccion+"</strong> fueron salvados.",
        callbackOk: function(e){
          trace("callbackOk");
          if ( estado()=="SIN_CONFIGURACION" && p.subseccion=="perfil" ){
            trace('mostrar aviso de SIN_CONFIGURACION');
            bienvenida();
          }
        } /* /callbackOk */
      });
    }; /* /resultadoPostSalvarFormulario */
    
    var deshabilitarBotonesEnviar = function(){
      trace("deshabilitarBotonesEnviar");
      //$botonesEnviar.unbind("click.misEventos");
    };
    
    var preprocesarIrA = {
      verGrilla : function(){
        trace("verGrilla");
        return "verGrilla";
      }
      ,
      agregarCarga : function(){
        trace("agregarCarga");
        ui.ponerDatos ({
          form: "#agregarCarga",
          data: carga
        });
        return "agregarCarga";
      }
    };
    
    var callbacksPorDefecto = {
      verGrilla : function(){
        trace("verGrilla");
      }
      ,
      agregarCarga : function(){
        trace("agregarCarga");
      }
    };
    
    borrarTodo = function(e){
      trace( "borrarTodo "+e);
      ui.mostrarDialogoConfirmar({
        mensaje: "Borrar todos los datos ¿Estás MUY seguro? ¡Esto no se puede deshacer!",
        callbackSi: function(e){
          trace("Si");
          io.borrarTodo();          
          ui.mostrarDialogoResultado({
            mensaje: "Todos los datos locales fueron borrados.",
            callbackOk: function(e){
              trace("callbackOk");
            } /* /callbackOk */
          })
        } /* /callbackSi */
        ,
        callbackNo: function(e){
          trace("Cancelar");
        }
      }); /* /mostrarDialogoConfirmar */
    }; /* /borrarTodo */
    
    borrarCargas = function(e){
      trace( "DEV: borrarCargas "+e.data.soy );
      var target = e.data.soy;
      tiempoFluido.ui.mostrarDialogoConfirmar({
        target: target,
        mensaje: "Borrar todas las cargas y reiniciar el contador de IDs ¿Estás MUY seguro? ¡Esto no se puede deshacer!",
        callbackSi: function(e){
          trace("Si");
          /*
                    tiempoFluido["datos"]["cargas"] = {};
          tiempoFluido["datos"]["idClaveCarga"] = 0;
          trace('tiempoFluido["datos"]["cargas"] = '+tiempoFluido["datos"]["cargas"]);
          tiempoFluido.io.salvarDatos({
            datos: [ 
              tiempoFluido.datos.cargas,
              tiempoFluido.datos.idClaveCarga
            ],
            objetoStorage: [
              tiempoFluido.perfil.id+".datos.cargas",
              tiempoFluido.perfil.id+".datos.idClaveCargas"
            ]
          }); 
          tiempoFluido.io.borrarCargas();
          */
          
          tiempoFluido.ui.mostrarDialogoResultado({
            target: target,
            mensaje: "Todos las datos locales de las cargas fueron borrados y se reinició el contador de IDs.",
            callbackOk: function(e){
              trace("callbackOk");
            } /* /callbackOk */
          })
        } /* /callbackSi */
        ,
        callbackNo: function(e){
          trace("Cancelar");
        }
      }); /* /mostrarDialogoConfirmar */
    }; /* /borrarTodo */
    
    borrarObjeto = function (e){
      // var tmp = io.borrarObjeto(perfil.id+".preferencias");  
    }; /* /borrarObjeto */

  };/* /aplicacion */

  return aplicacion;

})(jQuery,moment);

trace("cargado tiempo_fluido.js");
/* fin js */