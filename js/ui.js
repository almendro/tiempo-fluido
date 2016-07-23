/* 

Tiempo Fluido
-------------

Martín Ochoa
2016-03-17

User interface

*/


var tiempoFluido = window.tiempoFluido || {};

tiempoFluido.ui = (function($){

  var ui = {

    iniciar : function(){
      trace('iniciamos la UI');
      
      trace('elementos jQuery mobile');
      $( "#menu_principal" ).navbar();
      $( "[data-role='header'], [data-role='footer']" ).toolbar();
      //$( "[data-role='footer']" ).toolbar();

      $( document ).on( "pagecontainerchange", function() {
        var current = $( ".ui-page-active" ).jqmData( "title" );
        // Change the heading
        //$( "[data-role='header'] h1" ).text( current );
        // Remove active class from nav buttons
        $( "#menu_principal a.ui-btn-active" ).removeClass( "ui-btn-active" );
        // Add active class to current nav button
        $( "#menu_principal a" ).each(function() {
          //trace(current+" text  ="+ $(this).text());
          if ( $( this ).text() === current ) {
            $( this ).addClass( "ui-btn-active" );
          }
        });
      }); /* /on.pagecontainerchange */
      
      $( "body>[data-role='panel']" ).panel();
      
    } /* iniciar */
    , 

    ocultarDialogos : function (){
      trace('ocultarDialogos');
    //  $(".dialogo").fadeOut(300);
    },
    mostrarDialogoConfirmar : function (p){
      trace("mostrarDialogoConfirmar");
      var $dialogo = this.crearDialogo({
        target: p.target,
        class: "confirmar",
        botones: [{
            class: "dialogo_si",
            etiqueta: "SI",
            callback: p.callbackSi
          },{
            class: "dialogo_no",
            etiqueta: "NO",
            callback: p.callbackNo
          }]
      });
      trace("$dialogo id="+$dialogo.attr("id"));
      $(".mensaje",$dialogo).text(p.mensaje);
      $dialogo.fadeIn(300);
    } /* /mostrarDialogoConfirmar */
    ,
    mostrarDialogoResultado: function (p){
      trace("mostrarDialogoResultado");
      var $dialogo = this.crearDialogo({
        target: p.target,
        class: "resultado",
        botones: [{
          class: "dialogo_ok",
          etiqueta: "OK",
          callback: p.callbackOk
        }]
      });
      trace("$dialogo id="+$dialogo.attr("id"));
      $(".mensaje",$dialogo).text(p.mensaje);
      $dialogo.fadeIn(300);
    } /* /mostrarDialogoResultado */
    ,
    crearDialogo : function (p){
      var target = p.target; // el #id boton que llama al dialogo
      var $target = $(target);
      var botones = p.botones;
      var id = "dialogo_"+p.class+"_"+$target.attr('id');
      trace("crearDialogo "+target+" id="+id);
      var popup;
      popup = '<div id="'+id+'" ';
          popup+= 'data-role="popup" ';
          popup+= 'data-overlay-theme="b" ';
          popup+= 'data-theme="b" ';
          popup+= 'data-dismissible="false" >';
          popup+= '<div data-role="header" data-theme="a">';
          popup+= '<h1>Confirmar</h1>';
          popup+= '</div>';
          popup+= '<div role="main" class="ui-content">';
          popup+= '<h3 class="mensaje ui-title">(mensaje)</h3>';
      for ( b in botones ){
        popup+= '<button class="'+botones[b]["class"]+' ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b" data-rel="back">'+botones[b]["etiqueta"]+'</button>'; 
      }
      popup+= '</div>';
      popup+= '</div><!-- -->';
            
      trace("");
      //trace(popup);
      $(popup).appendTo( $.mobile.activePage );
      var $popup = $("#"+id);
      $popup.hide();
      // agrega los eventos y callback a cada  botón
      for ( b in botones ){
        $("."+botones[b]["class"],$popup)
          .bind(
            "click.misEventos",
            {
              $dialogo:$popup,
              callback:botones[b]["callback"]
            },
            this.cerrarDialogo
          );
      }
      return $popup;
    } /* /crearDialogoConfirmar */
    ,
    cerrarDialogo: function (p){
      p.data.callback();
      trace("cerrarDialogo "+p.data.$dialogo.attr("id"));
      p.data.$dialogo.fadeOut(300).remove();
    }
    ,
    eliminarDialogo: function (p){
      trace("eliminarDialogo "+p.$dialogo.attr("id"));
          /*
          $( document ).on( 
            "popupafterclose", 
            e.data.$dialogo, 
            function() {
              $( this ).remove();
            }
          );*/
      p.$dialogo.remove();
    } /* /eliminarDialogo */
    ,
    ocultarSeccion : function (){
      trace('ocultarSeccion');
    //  $(".seccion").fadeOut(300);
    },
    mostrarSeccion : function (seccion){
      trace('UI: mostrarSeccion'+seccion);
      //  this.ocultarSeccion();
      //  $("#"+seccion).fadeIn(300);
      $( ":mobile-pagecontainer" ).pagecontainer( "change", $("#"+seccion));
    } /* /mostrarSeccion */
    ,
    habilitarSeccion : function (seccion){
      seccion = listar(seccion);
      for ( s in seccion ){
        $("#m_"+seccion[s]).removeClass("ui-state-disable");
        $("#m_"+seccion[s]).show();
        //$("#"+seccion[s]).show();
      }      
    } /* /habilitarSeccion */
    ,
    deshabilitarSeccion : function (seccion){
      seccion = listar(seccion);
      for ( s in seccion ){
        $("#"+seccion[s]).hide();
        $("#m_"+seccion[s]).addClass("ui-state-disable").hide();
      }      
    } /* /deshabilitarSeccion */
    ,
    
    /* --- Manejo de SUBSECCIONES --- */
    
    mostrarSubseccion : function (subseccion){
      trace('UI: mostrarSubseccion '+subseccion);
      
      /* modo comun */
      //this.ocultarSubsecciones();
      //$("#"+subseccion).fadeIn(300);
      
      /* modo jQM */
      var prop = this.subseccionProp(subseccion);
      var $seccion = prop.$seccion;
      var indice = prop.indice;
      trace("indice "+indice+" de seccion "+$seccion.attr("id"));
      
      /*
      activamos la seccion y 
      establecer estado activo
      del boton de subseccion
      */
      $( ":mobile-pagecontainer" ).pagecontainer( "change", $seccion );
      var $subsecciones = $( "[data-role='tabs']",$seccion );
      $subsecciones.tabs("option","active",indice);
      $( "[data-role='tabs'] a",$seccion ).each( function(e) {
        $(this).removeClass("ui-tabs-active");
        //trace("e="+e+" i="+$(this).index()+" "+$(this).attr("href")+" | indice "+indice);
        if(e == indice){
          $(this).addClass("ui-tabs-active");
        }
      }); /* / each */
    } /* / mostrarSubseccion */
    ,
    
    ocultarSubsecciones : function (){
      trace('UI: ocultarSubsecciones');
      //$(".subseccion").fadeOut(300);
    } /* /ocultarSubsecciones */
    ,
    
    habilitarSubseccion : function (subseccion){
      trace( "UI: habilitarSubseccion "+subseccion);
      /*
      modo jQM 
      establecemos propiedad enabled del botón
      y mostramos el <a>
      */
      var prop = this.subseccionProp(subseccion);
      var $seccion = prop.$seccion;
      var indice = prop.indice;
      $( "[data-role='tabs']",$seccion ).tabs("option","enabled",[indice]);
      $( "#a_"+subseccion, $seccion ).show();
      
    } /* /habilitarSubseccion */
    ,
    deshabilitarSubseccion : function (subseccion){
      /*
      subseccion puede ser un STRING o ARRAY de STRINGS
      */
      trace("UI: deshabilitarSubseccion "+subseccion);
      
      subseccion = listar(subseccion);
      var prop, $seccion, indice;
      for ( s in subseccion) {
        trace("..."+subseccion[s]);
        prop = this.subseccionProp(subseccion[s]);
        $seccion = prop.$seccion;
        indice = prop.indice;
        $( "[data-role='tabs']",$seccion ).tabs("option","disabled",[indice]);
        $( "#"+subseccion[s], $seccion ).hide();
        $( "#a_"+subseccion[s], $seccion ).hide();
      }
    } /* /deshabilitarSubseccion */
    ,
    subseccionProp : function(subseccion){
      /* devuelve el indice y seccion */
      var $seccion = $("#"+subseccion).parents(".seccion");
      //trace("UI.subseccionProp seccion ="+ $seccion.attr("id"));
      var $subsecciones = $(".subseccion",$seccion);
      var indice = ($subsecciones.filter("#"+subseccion).index())-1;
      //trace(subseccion+" indice= "+indice);
      return {
        $seccion: $seccion,
        seccion: $seccion.attr( "id" ),
        indice: indice,
        subseccion: subseccion
      }
    } /* /subseccionProp */
    ,
    aplicarPlantilla : function (p){
      /*
      Aplica una plantilla html, por lo general
      un formulario que se repite, a una subsección
      que tiene una acción diferente sobre
      un mismo conjunto de datos. Ej. ABM CARGAS
      
      aplicarPlantilla({
        $subseccion: jQuery
      });
      
      */
      var salida,
          $miPlantilla,
          $enviar;
      
      $miPlantilla = $( "[data-plantilla-id='"+p.$subseccion.attr( "data-plantilla" )+"']" ).clone();
      $miPlantilla.
        removeAttr("data-plantilla-id").
        removeClass("plantilla_html");
      $enviar = $( ".enviar", $miPlantilla );
      $enviar.text(
        p.$subseccion.attr("data-plantilla-enviar")
      );
      p.$subseccion.append($miPlantilla);
      
      /* jQuery.mobile */
      $( ".acordion", $miPlantilla ).collapsible();
      
      salida = $miPlantilla;
      
      return (p.callback) ? p.callback( salida ) : salida;
    } /* /aplicarPlantilla */
    ,
    mostrarMensajeSeccion : function (div,m)
    {
      $(".mensaje",$(div)).hide();
      $("."+m,$(div)).show();
    }
    ,
    verPreferencias : function (p){
      trace('UI: verPreferencias '+p);
      var $div = $(p.div);
      var $propiedades = $( ".propiedad" , $div ).each( function (e) { 
        var soy = $(this);
        var $valor = $(".valor", soy);
        var id_propiedad = soy.attr("id");
        var propiedad = id_propiedad.replace(p.prefijo,"");
        //trace(propiedad+" = "+soy.val());
        $valor.text(p.datos[propiedad]);
        trace (propiedad+" = "+p.datos[propiedad]);
      });
      
    } /* verPreferencias */
    ,
    
    /*
    ponerDatos : function ( p ){
      trace('UI: verPreferencias '+p);
      AAAAAAAAASQQQQQWUUUUUIIIIII
      var $div = $(p.div);
      var $propiedades = $( ".propiedad" , $div ).each( function (e) { 
        var soy = $(this);
        var $valor = $(".valor", soy);
        var id_propiedad = soy.attr("id");
        var propiedad = id_propiedad.replace(p.prefijo,"");
        //trace(propiedad+" = "+soy.val());
        $valor.text(p.datos[propiedad]);
        trace (propiedad+" = "+p.datos[propiedad]);
      });
    }
    */
    ponerDatos : function ( p ){
      trace('UI: ponerDatos '+p);
      return populateForm (p); // Asset externo
    } /* ponerDatos */
    
  };
  
  return ui;

})(jQuery);

trace("cargado ui.js");
/* fin js */
