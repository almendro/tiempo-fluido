/*
DESBICHADOR

Martín Ochoa

v 0.1 - 2012-04-27

*/

var trace = function(){};
var desbichador_salida;
var desbichador_n;


	// --- --- --- EVENTOS DE TECLADO --- --- ---
	
	// doblekey intercepta que se haya pulsado dos veces una tecla y ejecuta una acción.

	var doblekey_ultima = null, 	// timeStamp de la ultima vez que se presionó una tecla
			doblekey_diferencia = 0,  // diferencia de tiempo
			doblekey_tecla = null, 		// ultima tecla presionada
			doblekey_tecla_actual;	  // tecla actual
			
			
function desbichador_init(){
	//alert("desbichador_init");
	
	// agregamos los elementos en el DOM
	jQuery('body').append("<div id=\"desbichador\"><div id=\"desbichador_contenido\"><div id=\"desbichador_fondo\"></div><div id=\"desbichador_activador\"></div><div id=\"desbichador_panel\"><div class=\"desbichador_variable\">(+)</div></div><div id=\"desbichador_salida\"><pre></pre></div><!-- #desbichador_salida --></div><!-- #desbichador_contenido --></div><!-- #desbichador -->");
	
	desbichador_salida = jQuery('#desbichador_salida pre');
	$desbichador_contenido = jQuery("#desbichador_contenido");
	$desbichador = jQuery('#desbichador');
	desbichador_n = 0;

	trace = desbichador; // emulamos para FLASH
	

	jQuery('html').keyup(function(e) {
		
		//console.log("html keyup "+e.which);
		
		doblekey_tecla_actual = e.which;

		// comprobamos si ya se habia pulsado antes la misma tecla
		if ( doblekey_ultima!=null && doblekey_tecla == doblekey_tecla_actual ) {
		
			// calculamos la diferencia tomando el timeStamp del evento, ver la variable (e) en la llamada a la function (esto lo genera jQuery automaticamente)
			doblekey_diferencia = e.timeStamp - doblekey_ultima;
			//console.log('doblekey_diferencia '+doblekey_diferencia);
			
			// umbral de activacion para el doblekey
			if ( doblekey_diferencia > 100 && doblekey_diferencia < 400 ){
			
			
				// activaciones del teclado que funcionan en todo momento
				
				switch (doblekey_tecla_actual)
				{
				
					case 68: // D - muestra/oculta la ventana del desbichador
						
						if($desbichador.css('visibility')=='visible'){
							$desbichador.css('visibility','hidden');
						} else {
							$desbichador.css('visibility','visible');
						}
						
					break;

				}// switch
				
				
			} // if dif > 100 < 400
			
		}// if doblekey_ultima
		
		// capturamos la pulsación actual
		doblekey_ultima = e.timeStamp;
		doblekey_tecla = doblekey_tecla_actual;
		
		console.log ("doblekey_tecla "+doblekey_tecla);
		
	}); // html.keyup
		
}

function fnull(){};

function desbichador (e){

	return desbichador_salida.append('<div><span>'+(desbichador_n++)+'</span>'+e+'</div>');
}


function desbichador_visualizar(){
	var desbichador_visible = $desbichador_contenido.css('visibility') == 'visible' ? 'hidden' : 'visible';
	$desbichador_contenido.css('visibility',desbichador_visible);
}

function desbichador_ver(e){

console.log('EEEEEEE');
	/* 	Devuelve una cadena (String)
		de un 'trace' especialmente formateado para objetos y arrays

	p: 	puede ser cualquier tipo objeto (Objecto, Array, MovieClip, Button)

	n: 	indica el n de anidamiento actual, necesario
			para para las tabulaciones cuando hay más de un n de profundidad
			de los datos.
	*/
		

	var p,n;
	
	if(e.p==undefined && e.n==undefined){
		p = e;
		n = 1;
	} else {
		p = e.p;
		n = e.n;		
	}

	
	
	

	var 	tabular,
				tabulacion,
				nro_elementos,
				tipo,
				salida,
				nro_actual,
				elemento,
				tipo_p,
				tabular_cierre;
	
	if(typeof(n) != 'number') n=1;
	
	
	//trace("p "+p+" n "+n);
	
	
	if(typeof(p)=='object'){

	

		// tabulacion inicial segun el n de profundidad
		tabular ="";
		for(tabulacion=0;tabulacion<n+1;tabulacion++){
			//trace(tabular+"tabulacion "+tabulacion);
			tabular+="  "; // 2 espacios
		}
	
		//trace(tabular+'function desbichador_ver(p = '+p+")");
		//trace(tabular+'n = '+n);
	
		// Contamos el numero de elementos del petro
		nro_elementos = desbichador_objeto_logitud(p);
		// trace(tabular+"LONGITUD "+nro_elementos);
	
	
		// Obtenesmos el tipo de datos para saber
		// si hay que poner llaves {} o corchetes {}
	
		tipo = typeof(p);
	
		// Los Array devuelven 'object' por lo tanto para diferenciarlos
		// de los objetos consultamos el propiedad .length
		// que solamente funciona con Arrays

		// colocamos las llaves de apertura { o [
		if(p.length){
			// Corregimos el tipo si es un array
			tipo='array';
			salida = " [ ";
		
			// prueba
			// salida += "\n";
		
		}
		if(tipo=='object'){
			salida = " { ";
		}
	
		// trace(tabular+"Tipo = "+tipo);
	
		if(tipo=='object') salida += "\n";
		// En el caso de los objetos bajamos una linea despues de abrir la llave {
	

		// Iniciamos el recorrido de los objetos dentro del petro.
		// y llevamos una referencia numerica del actual para dos cosas:
		// 1) Mostrar en orden correcto los Array
		// 2) Saber cuando es el ultimo elemento para no poner la coma al final
	
		nro_actual = 0;
		for(var pe in p){

			// Tomtamos el valor del elemento actual
			elemento = p[pe];
		
			if(tipo=='array'){
				// En el caso de los array el metodo anterior devuelte en orden
				// inverso los elementos, por eso accedemos con el indice numerico
				elemento = p[nro_actual];
			}
		
			// trace(tabular+nro_actual + "    p."+p+" = "+elemento);
		
			// En el caso de los objetos imprimimos el nombre
			// del identificador y los dos puntos.
			if(tipo=='object') {
				salida += tabular + pe + " : ";
			} else if (tipo!='array'){
				salida += tabular;
			}
		
			// Obtenemos el tipo de dato del elemento para saber si
			// es un objeto al cual hay que recorrer internamente
			// llamando de manera recursiva a la funcion ver
			tipo_p = typeof(elemento);
		

			// imprimimos el valor de elemento segun el caso correspondiente
			if (tipo_p == 'object'){
			 
				// trace(tabular+"llamamos a RERCURSIVA desde el n "+n);

				// llamamos nuevamente a la funcion y subimos un n
				salida += desbichador_ver({p:elemento,n:n+1});
			
				//trace(tabular+"volvemos de la recursiva al n "+n);
			
			} else if (tipo_p == 'string'){
				salida += "'"+elemento+"'";
			} else {
				salida += elemento;
			}
		
			//trace(tabular+nro_actual+" / "+nro_elementos);
		
			// Si el elemento actual no es el ultimo
			if (nro_actual < nro_elementos-1){
				// agregamos la coma para separar
				salida +=" , ";
				// y ponemos en nueva linea en el caso de los objetos
				if(tipo=='object') salida += "\n";
			}
		
		
			nro_actual++;
		} // for in
	
	
		// tabular cierre
		tabular_cierre ="";
	
		// contamos uno menos que el tabular anterior
		for(tabulacion=0;tabulacion<n;tabulacion++){
			//trace(tabular+"tabulacion "+tabulacion);
			tabular_cierre+="  ";
		}
	
		// cerramos la llave de objeto o array
	
		if(tipo=='object'){
			salida += "\n";
			if(nro_actual==nro_elementos && n!=0){
				salida += tabular_cierre;
			}
			salida += "} ";
		} else if(tipo=='array'){
			salida += " ] ";
		}
	

		if(n==0) salida += "\n";
	
		// trace(tabular+"VOLVER");	
	
		// devolvemos la cadena formateada
		return salida;
	
	} else {
		//return "ERROR: el petro no es un objeto";
		return String(p);
	}
}

function desbichador_objeto_logitud(p){
	var nro_elementos = 0;
	for(var n in p){
			nro_elementos++;
	}
	return nro_elementos;
}















// RealTypeOf
// http://joncom.be/code/realtypeof/


function RealTypeOf(v) {
  if (typeof(v) == "object") {
    if (v === null) return "null";
    if (v.constructor == (new Array).constructor) return "array";
    if (v.constructor == (new Date).constructor) return "date";
    if (v.constructor == (new RegExp).constructor) return "regex";
    return "object";
  }
  return typeof(v);
}


// Fixing the JavaScript typeof operator
// https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
Object.toType = (function toType(global) {
  return function(obj) {
    if (obj === global) {
      return "global";
    }
    return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
  }
})(this)
/*
Object.toType(window); //"global" (all browsers)
Object.toType([1,2,3]); //"array" (all browsers)
Object.toType(/a-z/); //"regexp" (all browsers)
Object.toType(JSON); //"json" (all browsers)
//etc..
*/






/* http://blog.ikhuerta.com/reemplazar-partes-de-funciones-javascript */
replaceInFunction = function ( functionName, search, replace)
{
	theFunction = eval(functionName).toString();
	eval( functionName + "= function " + theFunction.substring(theFunction.indexOf("(")).replace(search,replace) );
}

/*
// definimos la función...
function showMe ( variable )
{ 
	document.write( variable );
}
 
showMe("hello world"); 
// --> escribe "hello world" en pantalla
 
replaceInFunction("showMe","document.write","alert"); 
 
showMe("hello world"); 
// --> lanza un alert que diga "hello world"
*/
