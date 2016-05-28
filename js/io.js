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
    
    this.getProfile = function(){

       trace('IO: getProfile');
       var profile;
       if ( storage.isSet('tf.profile')){
         trace('hay datos de perfil');
         profile = storage.get('tf.profile');
         trace('profile='+profile);
       } else {
         trace('NO hay datos de perfil guardados');
         trace('podimos email del usuario y completamos con datos por defecto');
          profile = false;
       }
    
       return profile;
    };

    this.getConfigApp = function(){

       trace('IO: getConfigApp');
       
       return {}; // tmp
    };

  }; // var io

  return io;

})(jQuery);

trace("cargado oi.js");

/* fin js */
