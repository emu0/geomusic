var geocoder;
var map;
var tipobusqueda;
var misgrupos;
var k=0;
var array;
//Funcion que deberia ir en el bodyonLoad
function lanzadera(){
	leergrupos();
	initialize();
}
//Funcion para leer los grupos
function leergrupos(){
//setTimeout(pasoperfil(),300);
$.couch.session({
                success : function(session) {
                   var userCtx = session.userCtx;
		   $.couch.userDb(function(db) {
                   var userDocId = "org.couchdb.user:"+userCtx.name;
		   //Abrimos el documento del usuario elegido 
		   //alert("Intentando conectar a primer alert: "+userCtx.name);
        	   db.openDoc(userDocId, {success : function(userDoc) {
                   misgrupos=userDoc.grupos;
		   array = misgrupos.split(',');	
   		   for(var m in array ){
			if (array[m]=="Agrege grupos a favoritos"){
				var cadena="Agrege grupos a favoritos"
				var id=array.indexOf(cadena);
					if (id !=-1){
						array.splice(id,1);
					}//FIn de este if
			}//Fin del if.
		   }//Fin del for.

		   //alert(typeof misgrupos);//Esto me dice que es un STRING.....UN STRING !!!!. Lo separamos y convertimos a array
		   //array = misgrupos.split(',');

		   pasoperfil();
                }//Fin del function dentro del succes.
              });//Fin del succes
            });//FIn de userdB
         }//FIn del succes de session
      });//fin del couch session
}//Fin de funcion

//FUncion pasomapa
function pasoamapa(){
	if (tipobusqueda==1){
		var contenido = document.getElementById('bandabuscar').value;
	}
	else{
		var contenido = document.getElementById('lugarbuscar').value;
	}
	var newdiv1=document.createElement("div");
	var newdiv2=document.createElement("div");
	var newdiv3=document.createElement("div");
	var newh2=document.createElement("h2");
	var newul=document.createElement("ul");
	var newbutton=document.createElement("span");
	var newbutton2=document.createElement("span");

	eliminarElemento('marcos');
	eliminarElemento('botones');

	newdiv1.id = 'map_canvas';
	newdiv2.id='text_map';
	newdiv3.id='tabla_result';
	newh2.id='h2';
	newbutton.id='boton_volver';
	newbutton2.id='boton_fav';
	newdiv1.className = 'estilo_marco';
	newdiv2.className = 'estilo_marco';
	newdiv3.className= 'scroll';
	
	document.getElementById("profile").appendChild(newdiv1);
	initialize();
	
	newbutton.innerHTML='<input type="submit" class="estilo_boton text_boton" value="Buscar de nuevo" onclick="pasoaseleccion()">';
	newbutton2.innerHTML='<input type="submit" class="estilo_boton text_boton" value="Agregar a favoritos" onclick="guardarfavoritos()">';
	newh2.innerHTML=contenido;
	//newul.innerHTML='<p>heffiwj</p><p>heffiwj</p><p>heffiwj</p><p>heffiwj</p><p>heffiwj</p><p>heffiwj</p><p>heffiwj</p><p>heffiwj</p><p>heffiwj</p><p>heffiwj</p><p>heffiwj</p><p>heffiwj</p><p>heffiwj</p><p>hefsdaDwj</p>';
	
	newdiv2.appendChild(newbutton);	
	newdiv2.appendChild(newbutton2);	
	newdiv2.appendChild(newh2);	
	newdiv2.appendChild(newdiv3);

	document.getElementById("profile").appendChild(newdiv2);
}

function pasoperfil()
{
	//leergrupos();
	if (document.getElementById('marcos')){
	   eliminarElemento('marcos');
	   eliminarElemento('botones');
	}else if (document.getElementById('map_canvas')){
	   eliminarElemento('map_canvas');
	   eliminarElemento('tabla_result');
	   eliminarElemento('text_map');
	}
        else{
	   return;
        }
	//alert("este es el segundo alert");

	//Llamamos a la funcion para leer los grupos.
	var newdiv1=document.createElement("div");
	var newdiv2=document.createElement("div");
	var newdiv3=document.createElement("div");
	var newdiv4=document.createElement("div");
	var newh2=document.createElement("h2");
	var newul=document.createElement("ul");
	var newspan1=document.createElement("span");


	//Creamos ahora la parte correspondiente al boton de borrar los grupos
	var newbutton=document.createElement("span");
	newbutton.id='boton_mapa';
	//newbutton.innerHTML='<input type="submit" class="estilo_boton text_boton" value="Borrar Favorito" onclick="eliminarfavorito()">';
	newbutton.innerHTML='<input type="text" id="borrar" name="borrarme" maxlength="30" size="10"/>&nbsp&nbsp&nbsp<input type="submit" class="estilo_boton text_boton" value="Borrar Favorito" onclick="eliminarfavorito()">';


	newdiv1.id = 'map_canvas';//En map_canvas pondremos la foto.
	newdiv2.id='text_map';
	newdiv3.id='tabla_result';//Este seria para la columna con los grupos de usuarios
	newh2.id='h2';

	newdiv1.className = 'estilo_marco';
	newdiv2.className = 'estilo_marco';
	newdiv3.className= 'scroll';
	newdiv4.className= 'botones';

	newspan1.innerHTML='<img id="imagengrupo" alt="grupo" src="Images/box.jpg">';
	newdiv1.appendChild(newspan1);
	document.getElementById("profile").appendChild(newdiv1);
	
	var usuario=$('#usuarios').text();
	var posicion=usuario.indexOf("|");
	usuario=usuario.substring(0, posicion);
	//newh2.innerHTML=misgrupos;
	newh2.innerHTML=usuario;//aqui va el usuario

	for(var k in array ){
		var newli=document.createElement("li");
		//newli.innerHTML=array[k];
		newli.innerHTML = newli.innerHTML +'<div id="elemento-resultado">' + array[k] + '</div>';
		newul.appendChild(newli);

	}

	//En esta parte es donde salen los grupos correspondientes.
	newdiv3.appendChild(newul);
	newdiv2.appendChild(newh2);	
	newdiv2.appendChild(newdiv3);
	newdiv2.appendChild(newbutton);
	//newdiv4.appendChild(newbutton);
	document.getElementById("profile").appendChild(newdiv2);
	document.getElementById("profile").appendChild(newdiv4);

}//Fin de funcion


function pasoaseleccion(){

	/*elemento = document.getElementById('map_canvas');
	if (!elemento){
		return;
	}
	else{
		eliminarElemento('map_canvas');
		eliminarElemento('text_map');*/

	/*if (document.getElementById('marcos')){
	   eliminarElemento('marcos');
	   eliminarElemento('botones');
	}*/
	if (document.getElementById('map_canvas')){
	   eliminarElemento('map_canvas');
	   eliminarElemento('tabla_result');
	   eliminarElemento('text_map');
	}
        else{
	   return;
        }
	//Creamos los elementos correspondientes.
	var newdiv1=document.createElement("div");
	var newdiv2=document.createElement("div");
	var newspan1=document.createElement("span");
	var newspan2=document.createElement("span");
	var newspan3=document.createElement("span");
	var newspan4=document.createElement("span");

	newdiv1.id = 'marcos';
	newdiv2.id='botones';
	newspan1.id = 'grupo';
	newspan2.id = 'mapa';
	newspan3.id = 'botongrupo';
	newspan4.id = 'botonmapa';
	newspan1.className='estilo_marco';
	newspan2.className='estilo_marco';

	newspan1.innerHTML='<img id="imagengrupo" alt="grupo" src="Images/oasislive.jpg">';
	newspan2.innerHTML='<img id="imagenmapa" alt="mapa" src="Images/mapa.gif"> ';
	newspan3.innerHTML='<input class="estilo_input text_input" type="text" id="bandabuscar" autocomplete="on" title="Buscar banda" placeholder="Buscar banda"><input class="estilo_boton text_boton" type="submit"  value="\!Busca!" onclick="crearmapa(1)">';
	newspan4.innerHTML='<input class="estilo_input text_input" type="text" id="lugarbuscar" title="Buscar localizacion" placeholder="Buscar localizacion"><input class="estilo_boton text_boton" type="submit" value="\!Busca!" onclick="crearmapa(2)">';
	
	newdiv1.appendChild(newspan1);
	newdiv1.appendChild(newspan2);
	newdiv2.appendChild(newspan3);
	newdiv2.appendChild(newspan4);
	
	document.getElementById("profile").appendChild(newdiv1);
	document.getElementById("profile").appendChild(newdiv2);
	//}
}//FIn de funcion

function conseguirdatos(){
	//tipobusqueda = 1 buscar banda
	//tipobusqueda = buscar localización
	var url_cabecera = 'http://ws.audioscrobbler.com/2.0/?method=';
	var api_key = '&api_key=6153cd09b3c7c62ec14fdd267b1333d0';
	var format = '&format=json'
	
	if(tipobusqueda == 1){
		var busqueda = document.getElementById('bandabuscar').value;
		var metodo = 'artist.getEvents&artist=';	
	}

	else {
		var busqueda = document.getElementById('lugarbuscar').value;
		var metodo = 'geo.getEvents&location=';	
	}
	var url = url_cabecera+metodo+busqueda+format+api_key;
	getInfo(url);	
}


function getInfo(url){
	xmlHttp = new XMLHttpRequest(); 
	xmlHttp.onload = procesarRespuesta;
	xmlHttp.open( "GET", url, true );
	xmlHttp.send( null );
}

function procesarRespuesta(){
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
        	if (xmlHttp.responseText == "Not found"){
        	    alert('No se ha podido realizar la petición');
        	}
        	else{
        		var datos = eval ( "(" + xmlHttp.responseText + ")" );
        		if(datos.error > 0){
        			ponerResultadosTabla([datos["message"]]);
        		}
        		else if(datos.events.total == 0){
        			ponerResultadosTabla(["No hay conciertos"]);
        		}
        		
        		else{
        			var adress = 'Congo';
        			var geoString = new Array;
        			var nombreString = new Array;
        			var geoString = [];
        			var nombreString = [];
	        		var geoString_part = [0,0];
	        		
	        		for(i in datos.events.event){
		        		geoString_part[0] = datos.events.event[i].venue.location["geo:point"]["geo:lat"];
	        			geoString_part[1] = datos.events.event[i].venue.location["geo:point"]["geo:long"];
	        			if(geoString_part[0] != ''){
	        				geoString = geoString.concat(new google.maps.LatLng(geoString_part[0], geoString_part[1]));
	        				if(tipobusqueda==1){
	        					nombreString = nombreString.concat(datos.events.event[i].venue.location.city);
	        				}
	        				else{
	        					nombreString = nombreString.concat(datos.events.event[i].title);
	        				}
	        			}
	        			else{
	        				//geoString = geoString.concat(codeAddress(datos.events.event[i].venue["name"], datos.events.event[i].venue.location.city));
	        				//nombreString = nombreString.concat(datos.events.event[i].title);
	        			}
	        		}
	        		ponerResultadosMapa(geoString, nombreString);
	        		ponerResultadosTabla(nombreString);
    			}
        	}                    
    	}
    	else{
    		alert('Parece que algo no ha ido bien, por favor, vuelve a intentarlo.')
    	
    	}
}

function ponerResultadosMapa(geoString, nombreString){

	bounds = new google.maps.LatLngBounds();
	
 	for(i in geoString){
		addMarker(geoString[i], nombreString[i]);
		bounds.extend(geoString[i]);
	}
	
	map.fitBounds(bounds);
	
}

function ponerResultadosTabla(stringDatos){
	var newul=document.createElement("ul");
	//newul.id="elemento-resultado";
	for(i in stringDatos){
		newul.innerHTML = newul.innerHTML +'<div id="elemento-resultado">' + stringDatos[i] + '</div>';
	}		
	document.getElementById("tabla_result").appendChild(newul);
}
	
function eliminarElemento(id){
	elemento = document.getElementById(id);
	if (!elemento){
		alert("El elemento selecionado no existe");
	} else {
		padre = elemento.parentNode;
		padre.removeChild(elemento);
	}
}

function anadirElemento(id){
	var newdiv=document.createElement("div");
	var newtext=document.createTextNode("Label div :");
	var aTextBox=document.createElement('input');
	aTextBox.type = 'text';
	aTextBox.value = 'Input Element';
	aTextBox.id = 'txt_cell_two_';
	newdiv.appendChild(newtext); //append text to new div
	newdiv.appendChild(aTextBox); //append text to new div
	document.getElementById("test").appendChild(newdiv); //append new div to another
}

function crearmapa(valor){
	tipobusqueda=valor;
	conseguirdatos();
	pasoamapa();
}

function initialize(){
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(0,0);
	var myOptions = {
		zoom: 1,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}

function addMarker(posicion, titulo){
	new google.maps.Marker({
		position: posicion,
        	map: map,
        	draggable:true,
      		animation: google.maps.Animation.DROP,
        	title: titulo
	});
}


function codeAddress(direccion1, direccion2){
	var segunda_direccion=false;
	
	geocoder.geocode( { 'address': direccion1}, function(results, status) {
		if(status == google.maps.GeocoderStatus.OK) {
			var coord =  results[0].geometry.location;
			return coord;
        	}
		else{
			segunda_direccion=true;
			//alert("Geocode was not successful for the following reason: " + status + " Direccion: " + direccion1);
		}
	});
	if(segunda_direccion == true){
		geocoder.geocode( { 'address': direccion2}, function(results, status) {
		if(status == google.maps.GeocoderStatus.OK) {
        		return results[0].geometry.location;
        	}
		else{
			//alert("Geocode was not successful for the following reason: " + status + " Direccion2: " + direccion2);
		}
	});
	}
}//Fin de funcion


function toggleBounce() {

    if (marker.getAnimation() != null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

//En esta funcion se nos agregaran los grupos favoritos.
//Esta funcion se disparará al pulsar el boton "guardar grupo".
function guardarfavoritos(){
	//Lo primero, sacar el grupo a guardar.
	var salvame=$('h2').text();
	var k=0;
	//Ahora, una vez nos hemos asegurado que esta el grupo, entramos a la parte del manejo de usuarios.
	
	$.couch.session({
                success : function(session) {
                   var userCtx = session.userCtx;
		   $.couch.userDb(function(db) {
                   var userDocId = "org.couchdb.user:"+userCtx.name;
		   //Abrimos el documento del usuario elegido 
        	   db.openDoc(userDocId, {success : function(userDoc) {
                   misgrupos=userDoc.grupos;
		   array = misgrupos.split(',');
		   //Comprobamos si el grupo que vamos a guardar está en la base de datos.
		   for(var m in array ){
			if (array[m]==salvame){
				alert("Grupo guardado anteriormente.Revise favoritos.");
				k=1;
			}//Fin del if.
		   }//Fin del for.
		   if(k==0){
		   	//En caso de que no exista, procedemos a guardarlo.
		   	array.push(salvame);
		   	//Creamos una cadena de caracteres.
		   	var guardar = array.join(",");
		   	//alert(guardar);Tutto bene
		  	userDoc["grupos"] = guardar;
                   	db.saveDoc(userDoc, {success : function() {
				alert("Grupo agregado a favoritos");
                    }
                   });
		  }//FIn del if.
                }//Fin del function dentro del succes.
              });//Fin del succes
            });//FIn de userdB
         }//FIn del succes de session
      });//fin del couch session
}//End of function


//Funcion que nos permite borrar a los grupos correspondientes.
function eliminarfavorito(){
	//Lo primero, obtenemos el grupo que vamos a borrar.
	var borrame=$('#borrar').val();
	if (borrame == null || borrame ==""){
		alert("Introduzca por favor un grupo");
		return;
	}else{
	//Como se habran leido los campos, el array ya estará instanciado.
	var aux=0;
	//Ahora, una vez nos hemos asegurado que esta el grupo, entramos a la parte del manejo de usuarios.
	$.couch.session({
                success : function(session) {
                   var userCtx = session.userCtx;
		   $.couch.userDb(function(db) {
                   var userDocId = "org.couchdb.user:"+userCtx.name;
		   //Abrimos el documento del usuario elegido 
        	   db.openDoc(userDocId, {success : function(userDoc) {
                   misgrupos=userDoc.grupos;
		   array = misgrupos.split(',');
		   //Comprobamos si el grupo que vamos a guardar está en la base de datos.
		   for(var m in array ){
			if (array[m]==borrame){
				//alert("Se ha encontrado el grupo");
				aux=1;
			}//Fin del if.
		   }//Fin del for.
		   if(aux==1){
		   	//En caso de que exista, se borrará
			var id=array.indexOf(borrame);
			if (id !=-1){
				array.splice(id,1);
			}//FIn de este if
		   	//Creamos una cadena de caracteres con el array bien dimensionado
		   	var guardar = array.join(",");
		   	//alert(guardar);Tutto bene
		  	userDoc["grupos"] = guardar;
                   	db.saveDoc(userDoc, {success : function() {
				alert("Grupo borrado correctamente");
				//Aqui, volvemos a llamar a leer los grupos para que se actualize el HTML
				leergrupos();
                    }
                   });
		  }//FIn del primer if.
 		 if(aux==0){
			alert("El grupo no existe en favoritos");
		 }//FIn del segundo if
                }//Fin del function dentro del succes.
              });//Fin del succes
            });//FIn de userdB
         }//FIn del succes de session
      });//fin del couch session
   }//Fin el else
}//End of function


/*
// Funciones relativas al pie de pagina
function pasonosotros()
{
	if (document.getElementById('marcos')){
	   eliminarElemento('marcos');
	   eliminarElemento('botones');
	}else if (document.getElementById('map_canvas')){
	   eliminarElemento('map_canvas');
	   eliminarElemento('tabla_result');
	   eliminarElemento('text_map');
	}else{
	   return;
        }

	var newdiv1=document.createElement("div");
	var newdiv2=document.createElement("div");
	var newh2=document.createElement("h1");
	var newh3a=document.createElement("h3");
	var newh3b=document.createElement("h3");
	var newh3c=document.createElement("h3");
	var newh3d=document.createElement("h3");
	var newpa=document.createElement("p");
	var newpb=document.createElement("p");
	var newpc=document.createElement("p");
	var newpd=document.createElement("p");


	newdiv1.id ='cabecera_api';
	newdiv2.id='contenido_api';
		
	newpa.className = 'estilo_marco';
	newpb.className = 'estilo_marco';
	newpc.className= 'estilo_marco';
	newpd.className= 'estilo_marco';

	newh2.innerHTML='API Methods';
	newdiv1.appendChild(newh2);
	document.getElementById("profile").appendChild(newdiv1);



	newh3a.innerHTML='api1';
	newh3b.innerHTML='api2';
	newh3c.innerHTML='api3';
	newh3d.innerHTML='api4';

	newpa.innerHTML='descripcion1';
	newpb.innerHTML='descripcion2';
	newpc.innerHTML='descripcion3';
	newpd.innerHTML='descripcion4';
	
	newh3a.appendChild(newpa);
	newh3b.appendChild(newpb);
	newh3c.appendChild(newpc);
	newh3d.appendChild(newpd);

	newdiv2.appendChild(newh3a);
	newdiv2.appendChild(newh3b);
	newdiv2.appendChild(newh3c);
	newdiv2.appendChild(newh3d);

	document.getElementById("profile").appendChild(newdiv2);

}//Fin de funcion

*/



























