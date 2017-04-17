# tiempo-liquido

blog: http://almendro.3ns.com.ar/tiempo-liquido/

V1

Gestor de tiempo que distribuye de  manera uniforme, como si fuera líquido, la carga horaria de  proyectos o tareas a lo largo del tiempo en días.

Se puede fijar el tiempo por día que se puede dedicar a las tareas, como jornada laboral, y en función de eso cada día se comporta como un vaso contenedor. Los días contiguos estan dispuestos como vasos comunicados.

Al ingresar una nueva carga se fija el tamaño o peso en horas, y a lo largo de cuantos días se distribuye o entre fechas.

Se puede establecer en cada carga si la duración en días es fija o fluida.

Cuando se ingresa una nueva carga se va apilando y distribuyendo sobre lo existente.

Cuando se ingresan cargas que exceden la capacidad diaria en un mismo período se puede acomodar todo de varias maneras para encajar en el tiempo disponible.

Una forma de acomodar es que las cargas establecidas como fluidas se distribuyan en lo disponible abarcando nuevos días. Con lo cuál llegas cosas se estiran.

Ser puede hacer de manera automática o seleccionando las cargas fluidas que se quiera flexibilizar primero.

Otra forma es editando las cargas fijas cambiando su duración para dejar que las fluidas se acomoden nuevamente.

Se pueden realizar simulaciones y guardar diferentes estados para comparar y decidir la mejor distribución.

Las visualizaciones pueden ser de las cargas respetando proporciones a lo largo de una línea de tiempo, con los niveles por horas y los espacios para las contingencias. También puede ser sólo las duraciones. En el modo de vista de nivel ser puede configurar diario, semanal, mensual, etc, para saber cuanto falta para estar lleno de trabajo.

En el caso de que el nivel este muy cerca del límite o ser haya pasado puede configurarse un alerta.

Lo anterior es útil si se tiene que sumar horas a una carga, haciendo que se tengan que acomodar nuevamente llegas distribuciones.

Las cargas que se finalizaron con sobrante dejan lugar a para las demás.

Otra funcionalidad es el registro de actividad para controlar las horas invertidas. Para esto se puede utilizar el panel de vista de cargas y pulsar la que corresponde, de esta manera un cronómetro descuenta tiempo (consume) para saber que se haya trabajado (simil clockingit).

Entre cada carga queda un espacio de minutos, que representa el tiempo necesario para concentrarse al cambiar de proyecto. Este espacio es configurable en minutos, según lo que Chuik usuario estime necesito. Por defecto serán 5. A más tareas apiladas (simultáneas web un mismo día) más perdida entre traspaso. Este margen no se resta de las contingencias.

Nota para GUI: Las cargas fluidas pueden ir abajo en la grilla de días para repartirse visualmente, y arriba las fijas. Las cargas fijas aplastan a las fluidas obligándolas a estirarse o moverse hacia adelante.

También se puede configurar un valor para el mínimo diario que puede tener una carga, por ejemplo 20 minutos, por debajo de el cual no tiene sentido el tiempo invertido entre cambiar de una tarea a otra ese mismo día, con lo cual esa carga fluida se reparte nuevamente hasta superar el mínimo diario.

Nota: acerca del tiempo mínimo, ver Pomodoro technic. También artículo sobre estado de concentración. Pausas de descanso.

Las contingencias consumen tiempo del reservado para ellas. Si llega a suceder que consumen más allá del disponible comienzan a desplazar las cargas fluidas, luego a las fijas. Esto genera alertas si se han configurado. De manera tal que uno pueda evaluar como continuar.

Las interrupciones son inevitables, para llevar un control se puede hacer que consuman de la reserva para contingencias.

En el panel de seguimiento de cargas, junto a los botones de cronómetro estarán los de contingencias e interrupciones.

Todo esto sistema es anidable. Las cargas pueden tener dentro detalladas subcargas para tareas. Todo se comporta de las misma manera en el espacio disponible. Si el espacio quedará chico y se agregan nuevas subcargas hay que subir un nivel y administrar las cargas madres.

Todo el sistema puede funcionar independiente y sin conexión. Se puede configurar servidor que sincronize entre diferentes dispositivos.

También ser puede gestionar el tiempo para equipos. Los usuarios pueden compartir su estado para que otros vean primero si solicitar algo o no, o si pueden interrumpir.

Principalmente tiene que tener funciones mínimas para uso sencillo, luego el usuario conforme vaya ganando experiencia puede ir sumando funciones. Modo simple, modo avanzado, modo equipo. Sincronizar con calendarios iCalc, gestores de tareas, sistemas de tickets. Seleccionar que momentos del día puede concentrar más tiempo a cargas fijas, o que días de la semana a tal o cual carga según su experiencia laboral. Configurar para horas extras.


v1.01 17.04.17