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
    
    if ( storage.isSet('configApp')){
      trace('hay datos de configuración guardados');
    } else {
      trace('NO hay datos de configuración guardados');
      trace('podimos email del usuario y completamos con datos por defecto');
    }
    this.getConfigApp = function(){

       trace('IO: getConfigApp');
       
       return {}; // tmp
    };

  }; // var io

  return io;

})(jQuery);

trace("cargado oi.js");

/* fin js */
