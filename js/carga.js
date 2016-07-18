/* 

Tiempo Fluido
-------------

Martín Ochoa
2016-03-17

Carga

*/


var tiempoFluido = window.tiempoFluido || {};

tiempoFluido.Carga = (function($){

  var Carga = fuction(id){
    var soy = this;
    this.obtenerCarga = function(){
      return id;
    }
  };

  Carga.crear = function(p){
    trace('crear carga');
    var carga = new Carga(p);
    return carga;
  };


  return Carga;

})(jQuery);

trace("cargado carga.js");

/* fin js */
