var replaceAll = function( string, omit, place, prevstring ) {
  if (prevstring && string === prevstring)
    return string;
  prevstring = string.replace(omit, place);
  return replaceAll(prevstring, omit, place, string)
 };
 /* http://stackoverflow.com/a/22870785  */

 var listar = function (e){
   /*
   Devuelve una lista
   */
   if (typeof e === "object") return e;
   if (typeof e === "string") return [e];
   return false;
 }
