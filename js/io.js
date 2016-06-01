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
    this.salvarDatos = function ( formulario , callback ){
      trace('IO: salvarDatos ' + formulario);
      //trace('IO: salvarDatos ' + callback);
      var datos = jQuery("input",$("#"+formulario));
      var salvar = {};
      datos.each(function(evento){
        var soy = $(this);
        var id_propiedad = soy.attr("id");
        var propiedad = id_propiedad.replace(formulario+"_","");
        //trace(propiedad+" = "+soy.val());
        salvar[propiedad] = soy.val();
        trace (propiedad+" = "+salvar[propiedad]);
        storage.set('tf.'+formulario,salvar);
        //trace( "storage.get('tf." + formulario + "." + propiedad + "') = " + storage.get( 'tf.' + formulario + '.' + propiedad ));
      }); /* datos.each */
      // return storage.get( 'tf.' + formulario ); 
      return callback();
    }; /* salvarDatos */
    
  }; /* var io */

  return io;

})(jQuery);

trace("cargado oi.js");

/* fin js */
