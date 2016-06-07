/* 

Tiempo Fluido
-------------

Martín Ochoa
2016-03-17

input/output data

*/


var tiempoFluido = window.tiempoFluido || {};

tiempoFluido.io = (function($){

  var io = function(){
    
    trace('creamos el objeto IO');
    
    var soy = this;
    
    jQuery.alwaysUseJsonInStorage(true);
    var storage = jQuery.localStorage;
    
    // DEV
    // storage.removeAll();
    
    this.borrarTodo = function(){
       trace('IO: borrarTodo');
       storage.removeAll();  
       return true;
    };
    
    this.cargarPerfil = function(){

       trace('IO: cargarPerfil');
       var perfil;
       if ( storage.isSet('tf.perfil')){
         trace('hay datos de perfil');
         perfil = storage.get('tf.perfil');
         trace('perfil='+perfil);
       } else {
         trace('NO hay datos de perfil guardados');
         perfil = false;
       }
    
       return perfil;
    };

    this.cargarConfiguracionAplicacion = function(perfil){
 
       trace('IO: cargarConfiguracionAplicacion');
       trace( 'perfil = ' + perfil );

        return false; // tmp
     };

    this.obtenerDatosFormulario = function ( formulario , callback ){
      trace('IO: obtenerDatosFormulario ' + formulario);
      var datos = $("."+formulario+".propiedad" , $( "#" + formulario ));
      var salida = {};
      datos.each(function(evento){
        var soy = $(this);
        var id_propiedad = soy.attr("id");
        var propiedad = id_propiedad.replace( formulario + "_" , "" );
        /* poner aqui la recursiva para procesar grupis array */
        if( soy.hasClass("array") ) {
          salida[propiedad] = obtenerDatosFormulario ( id_propiedad );
        } else {
          salida[propiedad] = soy.val();
        }
        trace (propiedad+" = "+salida[propiedad]);
      }); /* datos.each */ 
      return ( callback )? callback( salida ) : salida;
    }; /* obtenerDatosFormulario */

    this.salvarDatos = function ( datos , objetoStorage , callback ){
      trace('IO: salvarDatos ' + datos );
      trace('IO: salvarDatos ' + objetoStorage );
      storage.set('tf.'+objetoStorage , datos );
      return callback();
    }; /* salvarDatos */
    
  }; /* var io */

  return io;

})(jQuery);

trace("cargado oi.js");

/* fin js */
