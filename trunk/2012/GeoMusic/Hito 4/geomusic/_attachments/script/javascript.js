var geocoder;
var map;
var tipobusqueda;

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

	var newdiv1=document.createElement("div");
	var newdiv2=document.createElement("div");
	var newdiv3=document.createElement("div");
	var newdiv4=document.createElement("div");
	var newh2=document.createElement("h2");
	var newul=document.createElement("ul");
	var newspan1=document.createElement("span");

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
	newh2.innerHTML=usuario;
	
	newdiv2.appendChild(newh2);	
	newdiv2.appendChild(newdiv3);
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
