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

    this.cargarConfiguracionAplicacion = function(){

       trace('IO: cargarConfiguracionAplicacion');
       
       return false; // tmp
    };
    
    this.habilitarFormulario = function(){

       trace('IO: habilitarFormulario');
       
       return false; // tmp
    };

  }; // var io

  return io;

})(jQuery);

trace("cargado oi.js");

/* fin js */
