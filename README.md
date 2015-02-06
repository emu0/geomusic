# GEOMUSIC

Imported from Subversion:
http://aap-etsiit-ugr.googlecode.com/svn/trunk/2012/GeoMusic/Hito%204/geomusic/

Stable version can be found here:
http://geomusic.iriscouch.com/geomusic/_design/geomusic/index.html

## Useful information
Copied WIKI from Subversion (In Spanish)

Creadores: Angel, Emilio y Sole

#PROYECTO GEOMUSIC

##Miembros

Este proyecto ha sido programado por:

 * Emilio Martínez (emu)
 * Angel Bueno (srsudo)
 * Soledad Pascual (marsolpv aka sole)

##Descripcion general

Geomusic es un proyecto de software libre en el cual se emplean los conocimientos adquiridos a lo largo de la asignatura de AAP: jquery, javascript, json, algo de nodejs y lo mas importante, las bases de datos no relaciones, usando couchapp como el maximo exponente de dicho tipo de base de datos para desarrollar un proyecto que permita gestionar grupos musicales y nos permita localizar los conciertos de dicho grupo, además de los conciertos disponibles en una zona. Así, aunando todas las tecnologias disponibles y aprendidas, hemos sido capaces de desarrollar una aplicacion que cumple la funcionalidad prevista en hitos anteriores.

##Desarrollo del proyecto

Tal y como se indicó en hitos precedentes, la funcionalidad requerida era la desarrollar una aplicación que fuese capaz de realizar una  búsqueda basada en geolocalización (Geo+Music) en función del grupo de música o de la localidad deseada. Teniendo esto en mente, se implementó una interfaz en la que se permitían sendas entradas para lograr dicha la funcionalidad requerida. Acto seguido, se trató el tema de los mapas usando para ello la [https://developers.google.com/maps/?hl=es API de Google Maps]. Posteriormente,nos dimos cuenta que con el mapa solo no se iba a ningún lado, asi que, usando la api de [http://www.lastfm.es/api lastfm] fuimos capaces de obtener los datos que requeríamos en función de la búsqueda realizada. Por ultimo, quedaba lo mas difícil: El alojamiento web y la base de datos. Esta ha sido la parte mas larga ya que couchapp presenta una documentación escasa, aunque gracias a los ejemplos que se explicaron en clase (y a la paciencia del profesor )fuimos capaces de entender la estructura de estas bases de datos y lanzarnos al desarrollo web en sí.Por otro lado, se implementó el modelo vista-controlador, en el que a partir de una única pagina web vamos modificando todas las etiquetas que consideramos oportunas para alcanzar el fin deseado, actualizando según necesidades. Dos partes fueron realmente complicadas: La parte del parseo de la información para los mapas, y el tema de las sesiones y el ingreso de nuevos usuarios/grupos. 

Una vez solventado estos problemas,lanzamos una versión que podríamos decir "beta",y nos centramos en ir puliendo los detalles del código hasta alcanzar una versión "estable". Para lograr dicho objetivo, tuvimos el principal problema de lograr replicar una base de datos y poder trabajar de manera asíncrona (vamos, cada uno haciendo lo suyo). Al final, se consiguió replicarla y pudimos trabajar en dominios de iriscouch específicos para cada miembro. A partir de ahí, nos basamos en un par de hacktones y en diversas sesiones "hardcore" para terminar la práctica y lograr la dichosa versión "estable".

Nótese que la aplicación es totalmente abierta y escalable, pudiendo mejorarla en ciertos aspectos y lanzarla a posibles versiones mucho más "serias" que excedan más allá del marco universitario.

##Estructura del proyecto

Couchapp genera una jerarquia de carpetas que son utilizadas con distintos fines. En este documento, explicaremos paso a paso cada una de las carpetas y documentos que componen geomusic. 
Las primeras carpetas que encontramos según abrimos la carpeta principal _*“Geomusic”*_ son:

 * *1 - _attachments:* contiene a su vez las carpetas “Images”, “script” y “style” y los documentos “index.html”, “selección.html” y “usuario.html”.
 * *2 - lists:*: Encontramos el archivo “milista.js”.
 * *3 - shows.*: Carpeta que se utiliza para las vistas
 * *4 - updates.* : Carpeta que se utiliza para las actualizaciones
 * *5 - vendor:* Contiene la carpeta “couchapp”.
 * *6 - views:* Contiene la carpeta “recent-items” que indica las ultimas vistas generadas.

En esta misma carpeta también encontramos los documentos:

 * couchapp.json : * Indica las especificaciones del proyecto
 * language : * Indica el lenguaje de scripting.

Pasemos a explicar cada una de las carpetas: 

===_attachments===

Es la carpeta principal donde esta contenido los códigos HTML y el archivo javascript.js que contiene las funciones que sostienen el proyecto.Consta de las siguientes carpetas:

 * Carpetas 

     * Images: esta carpeta contiene todas las imágenes que se han usado para crear las interfaces de los distintos HTML contenidos en la página web.
     * Script: encontramos los archivos “app.js” y “javascript.js”. Estos son esencialmente los archivos más importantes y sobre los que se sustenta la practica.Concretamente, javascript.js es el principal archivo donde se podran encontrar los métodos mas significativos.
     * Style: encontramos los archivos “estilo.css” y “main.css”. EStos archivos son los que soportan la pagina web propiamente dicha.

 * Archivos
	
    * Index.html: Archivo html que contiene la pagina sobre la que esta colgada la aplicacion.
    * Selección.html: Archivo html que contiene la pagina para hacer la seleccion de los mapas.
    * Usuario.html: Pagina html que se utiliza para hacer el perfil de favoritos.

=== Lists. ===

Es esta carpeta se muestran las listas usadas. Nosotros hemos usado la pagina web con vistas, asi que solo hay una funcion de prueba que está vacía.

=== Shows. ===

Esta carpeta se utiliza para cuando es necesario utilizar una funcion del tipo show.

=== Updates. ===

Carpeta que se utiliza en caso de actualizacion. En nuestro caso está vacía.

=== Vendor. ===

 * Carpetas 

Contiene la carpeta “couchapp” que a su vez contiene otra carpeta “_attachments” que almacena los  siguientes archivos: 

    * Jquery.couch.app.js: Libreria definida de jquery para couchapp 
    * Jquery.couch.app.utils.js: Libreria definida de jquery para couchapp
    * Jquery.couchForm.js Se utiliza para la gestion de formularios
    * Jquery.couchLogin.js: Se utiliza en la autentificacion de usuarios
    * Jquery.couchProfile.js: Se utiliza para la gestion de usuarios
    * Jquery.moustache.js: Se utiliza para generacion de mensajes
    * Md5.js: Fichero usado en la encriptación.
    * También se puede encontrar el archivo metadata.json que contiene el tipo de base de datos con el que se está tratando.

=== Views. ===

Carpeta que se utiliza para la vistas. Contien una subcarpeta, “recent-items”, la cual tiene la ultima vista generada.

== Lenguajes y tecnologías utilizadas ==

Se ha utilizado los siguientes lenguajes:

 * HTML: Para el diseño de la pagina web, así como de las cabeceras y demás
 * Javascript: Es principalmente donde se sustenta la aplicación. Toda ella se basa en este lenguajes de manera directa o indirecta.
 * Jquery: Lenguaje utilizado para poder jugar con los menus desplegables, etiquetas, efecto de botones, etc...
 * Couchapp: Base de datos con un fuerte caracter en jquery y javascript. Se utiliza para el tema de las sesiones y demas.
 * JSON: Tratamiento de datos y peticiones hechas al servidor.
 * AJAX: Para hacer peticiones GET y en los metodos de las sesiones, asi como los cambios del HTML que se realizan de manera asíncrona.
 * XML: Se utiliza en la parte la informacion de lastfm

Otro elemento importante ha sido la forja de la asignatura para poder trabajar todos de manera conjunta, aunque bien es cierto que al final unicamente se utilizaron los archivos subidos como copia de seguridad ya que aprendimos a trabajar de manera independiente con bases de datos en iriscouch. También me gustaria resaltar que la base de datos se encuentra disponible en mysql y se encuentra replicada en [www.db4free.ne db4free]  (user:geomusic, pass:aapugr1213)  a la cual se accedía mediante scripts cgis en python. Sin embargo, dada la simplicidad de couchaap, asi como la potencia que se puede lograr una vez se han entendido los conceptos basicos, abandonamos el "mal camino" y optamos por desarrollar la aplicación con las tecnologias explicadas anteriormente, aunque fué una experiencia que nos sirvió para darnos cuentas de realmente la ventaja de las bases de datos "couchaap style" frente a otras mas tradicionales.Dado que no son relevantes para el proyecto final, no se encuentran en los ficheros finales por ser irrelevantes, aunque hemos querido mencionarlos. 


== APIs externas ==

Dado el caracter de geolocalización de nuestro proyecto, nos vimos obligados a usar las apis de lastfm y de googlemap. Se prefirió respecto a otras por su gran versatilidad, claridad y potencia,aunque debemos de tener cuidado puesto que googlemap empieza a cobrar si hacemos muchas peticiones(igual que iriscouch).


== ¿ Y dónde está todo ? ==

Se puede encontrar una aplicación funcionando correctamente en el siguiente enlace
(ver Issue)

Invitamos al registro en la aplicacion y la comprobación de su funcionalidad.
 
Si desea hacer alguna peticion REST, se debe de modificar el campo xxxx:xxx por profe:123,y debe de hacerse desde la linea de comandos con curl.El motivo de que no aparezcan dichos campos visibles para todos es evitar que alguien, maliciosamiente, entre en nuestra base de datos y la haga pedazos cual "conan el barbaro".

== Funcionamiento ==

En algun momento, en algun lugar del universo conocido, funcionó, y aqui la prueba de ello.

* Pantalla principal: Esto es lo primero que vemos. NO se puede acceder a la interfaz de las APIS si no se está logeado.

http://geomusic.iriscouch.com/geomusic/_design/geoprueba/Images%2fprincipal.png

* Pantalla de seleccion: Una vez logeados, entramos en la pantalla de selección donde se nos permite hacer una busqueda. Nosotros nos hemos hecho fans de radiohead en la práctica, asi que buscaremos los conciertos de radiohead:

http://geomusic.iriscouch.com/geomusic/_design/geoprueba/Images%2fradiohead.png

Una vez hemos encontrado el grupo, obtenemos la pantalla de los mapas que se actualiza por jquery, con la informacion correspondiente:

http://geomusic.iriscouch.com/geomusic/_design/geoprueba/Images%2fresultado.png

Como vemos, realiza la búsqueda correctamente. Ahora si pulsamos el botón de la estrella nos lo agrega a favoritos. Para ello, pulsamos el botón, esperamos (métodos de acceso a la base de datos) y posteriormente, pulsamos en la pestaña de mi perfil.

http://geomusic.iriscouch.com/geomusic/_design/geoprueba/Images%2fhazmefavorito.png

Si vamos a la pantalla de "mi perfil" vemos que efectivamente, el grupo aparece agregado a favoritos.

http://geomusic.iriscouch.com/geomusic/_design/geoprueba/Images%2fmisfavoritos.png

Si pulsamos sobre el nombre de nuevo,  vuelve a aparecer el mapa de nuevo , y si pulsamos sobre algún lugar, vuelve a señalarse el lugar con los datos que necesitemos:

http://geomusic.iriscouch.com/geomusic/_design/geoprueba/Images%2fmisfavoritos2.png

Por último, si borramos el grupo, aparecerán los campos vacíos:

http://geomusic.iriscouch.com/geomusic/_design/geoprueba/Images%2fsinfavoritos.png

Para los lugares la interfaz y el procedimiento es análogo, y lo omitiré para no repetirme, aunque huelga decir que funciona igual de bien que para los grupos.

Finalmente, queda la parte del pie de página, en la que se incluyen breves descripciones de los métodos utilizados, así como los hitos y las peticiones REST.

 * Información de métodos
http://geomusic.iriscouch.com/geomusic/_design/geoprueba/Images%2fgeomusicinfo.png

 * Peticiones REST
http://geomusic.iriscouch.com/geomusic/_design/geoprueba/Images%2frest.png

 * Información sobre nosotros

http://geomusic.iriscouch.com/geomusic/_design/geoprueba/Images%2fnosotros.png
