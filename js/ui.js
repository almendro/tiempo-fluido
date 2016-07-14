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
          trace(current+" text  ="+ $(this).text());
          if ( $( this ).text() === current ) {
            $( this ).addClass( "ui-btn-active" );
          }
        });
      });
      
      $( "body>[data-role='panel']" ).panel();
      
    } /* iniciar */
    , 

    ocultarDialogos : function (){
      trace('ocultarDialogos');
    //  $(".dialogo").fadeOut(300);
    },
    mostrarDialogoConfirmar : function (p){
      trace("mostrarDialogoConfirmar");
      var target = p.target;
      var mensaje = p.mensaje;
      var callbackSi = p.callbackSi;
      var callbackNo = p.callbackNo;
      /*
      $("#dialogo_confirmar")
        .appendTo( $.mobile.activePage )
        .popup();
      */
      var $dialogo = this.crearDialogo({
        target: target,
        botones: [{
            class: "dialogo_si",
            etiqueta: "SI"
          },{
            class: "dialogo_no",
            etiqueta: "NO"
          }]
      });
      trace("$dialogo id="+$dialogo.attr("id"));
      //$dialogo.popup("open");
      $(".mensaje",$dialogo).text(mensaje);
      $(".dialogo_si",$dialogo).bind("click.misEventos",{$dialogo:$dialogo},callbackSi);
      $(".dialogo_no",$dialogo).bind("click.misEventos",{$dialogo:$dialogo},callbackNo);
    } /* /mostrarDialogoConfirmar */
    ,
    crearDialogo : function (p){
      var target = p.target; // el #id boton que llama al dialogo
      var $target = $(target);
      var botones = p.botones;
      var id = "dialogo_confirmar_"+$target.attr('id');
      trace("crearDialogoConfirmar "+target+" id="+id);
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
      //.popup();
      //trace("popup "+$("#"+id).attr("id"));
      //$("#"+id).popup();
      return $("#"+id);
    } /* /crearDialogoConfirmar */
    ,
    mostrarDialogoResultado: function (p){
      
    } /* /mostrarDialogoResultado */
    ,
    eliminarDialogo: function (p){
      trace("eliminarDialogo "+p.$dialogo);
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
    },
    ocultarSubsecciones : function (){
      trace('UI: ocultarSubsecciones');
    //  $(".subseccion").fadeOut(300);
    },
    mostrarSubseccion : function (subseccion){
      trace('UI: mostrarSubseccion '+subseccion);
    //  this.ocultarSubsecciones();
    //  $("#"+subseccion).fadeIn(300);
    /*
    // Getter
var active = $( ".selector" ).tabs( "option", "active" );
 
// Setter
$( ".selector" ).tabs( "option", "active", 1 );

    */
      var prop = this.subseccionProp(subseccion);
      var $seccion = prop.seccion;
      var indice = prop.indice;
      trace("prop "+indice+" "+$seccion.attr("id"));
      $( "[data-role='tabs']",$seccion ).tabs("option","active",indice);
      /* establecer estado activo */
      $( "[data-role='tabs'] a",$seccion ).each( function(e) {
        $(this).removeClass("ui-tabs-active");
        trace("e="+e+" i="+$(this).index()+" "+$(this).attr("href")+" | indice "+indice);
        if(e == indice){
          $(this).addClass("ui-tabs-active");
        }
      }); /* / each */
    } /* / mostrarSubseccion */
    ,
    deshabilitarSubseccion : function (subseccion){
      var prop = this.subseccionProp(subseccion);
      var $seccion = prop.seccion;
      var indice = prop.indice;
      $( "[data-role='tabs']",$seccion ).tabs("option","disabled",[indice]);
      
    } /* /deshabilitarSubseccion */
    ,
    subseccionProp : function(subseccion){
      /* devuelve el indice y seccion */
      var $seccion = $("#"+subseccion).parents(".seccion");
      trace("sec "+ $seccion.attr("id"));
      var $subsecciones = $(".subseccion",$seccion);
      var indice = ($subsecciones.filter("#"+subseccion).index())-1;
      trace("indice "+indice);
      return {
          seccion: $seccion,
          indice: indice
      }
    } /* /subseccionProp */
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
      return populateForm (p);
    } /* ponerDatos */
    
  };
  
  return ui;

})(jQuery);

trace("cargado ui.js");
/* fin js */
