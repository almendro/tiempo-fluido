/* 

Tiempo Fluido
-------------

Martín Ochoa
2016-03-17

input/output data

*/


var tiempoFluido = window.tiempoFluido || {};

tiempoFluido.io = (function($){
    
  var storage, soyIo;
  
  var io = //function(){
    {
    //trace('creamos el objeto IO');
    iniciar: function (){
      soyIo = this;
      trace('iniciar IO');
      $.alwaysUseJsonInStorage(true);
      storage = $.localStorage;
    }
    ,
    borrarTodo : function(){
       trace('IO: borrarTodo');
       storage.removeAll();  
       return true;
    }
    ,
    borrarObjeto : function (objeto){
        trace("IO: borrarObjeto "+objeto);
        if (storage.isSet("tf."+objeto)){
          storage.remove("tf."+objeto);
        }
        trace(objeto+"? "+storage.isSet("tf."+objeto));
        return true;
    }
    ,
    cargarPerfil : function(){

       trace('IO: cargarPerfil');
       var perfil;
       if ( storage.isSet('tf.perfil')){
         trace('hay datos de perfil');
         perfil = storage.get('tf.perfil');
         trace('perfil='+JSON.stringify(perfil));
       } else {
         trace('NO hay datos de perfil guardados');
         perfil = false;
       }
    
       return perfil;
    }
    ,
    cargarPreferencias : function(perfilId){

       trace('IO: cargarPreferencias');
       trace( 'perfilId = ' + perfilId );

       var preferencias;
       if ( storage.isSet( 'tf.' + perfilId + '.preferencias' ) ) {
         trace('hay datos de preferencias');
         preferencias = storage.get( 'tf.' + perfilId + '.preferencias' );
       } else {
         trace('NO hay datos de preferencias guardados');
         preferencias = false;
       }
       return preferencias; // tmp
     }
     ,
     obtenerDatosFormulario : function ( formulario , callback ){
      trace('IO: obtenerDatosFormulario ' + formulario);
      var datos = $("."+formulario+".propiedad" , $( "#" + formulario ));
      var salida = {};
      datos.each(function(evento){
        var soy = $(this);
        var id_propiedad = soy.attr("id");
        
        var propiedad = id_propiedad.replace( formulario + "_" , "" );
        /* poner aqui la recursiva para procesar grupis array */
        if( soy.hasClass("objeto") ) {
          trace ("objeto");
          salida[propiedad] = soyIo.obtenerDatosFormulario ( id_propiedad );
        } else {
          salida[propiedad] = soy.val();
          /* aqui para procesar segun el tipo de datos checkbox radio, etc
          http://api.jquery.com/val/
          http://www.wastedpotential.com/html-multi-checkbox-set-the-correct-way-to-group-checkboxes/
          http://stackoverflow.com/questions/9533081/get-value-of-checked-checkbox-list-in-array-in-jquery
          */
          
          trace("type "+soy.attr("type"));
          if( soy.attr("type")=="checkbox"){
              salida[propiedad] = soy.is(":checked"); /* gracias Marcelo! */
          }
          
        }
        trace ( propiedad + " = " + salida[propiedad]);
      }); /* datos.each */ 
      return ( callback )? callback( salida ) : salida;
    } /* obtenerDatosFormulario */
    ,
    obtenerDatosFormulario : function ( formulario , callback ){
       trace('IO: obtenerDatosFormulario (serializeJSON)' + formulario);
      var salida = $("#"+formulario).serializeJSON({checkboxUncheckedValue: false}); 
      return ( callback )? callback( salida ) : salida;
    } /* obtenerDatosFormulario */
    ,
    salvarDatos : function ( datos , objetoStorage , callback ){
      trace('IO: salvarDatos datos ' + JSON.stringify(datos) );
      trace('IO: salvarDatos objetoStorage ' + objetoStorage );
      storage.set('tf.'+objetoStorage , datos );
      trace('tf.' + objetoStorage + " = " + datos );
      return callback();
    } /* salvarDatos */
    
  }; /* var io */

  return io;

})(jQuery);

trace("cargado oi.js");

/* fin js */
