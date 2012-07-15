/*
LEER TODOS LOS COMENTARIOS ANTES DE MODIFICAR NADA.

HAY QUE AHCER QUE EL BOTON_FAV Y BOTON_FAV_IND DE LAS FUNCIONES TOMEN LA IMAGEN STARFAV.PNG Y STARNOFAV.PNG DE LOS DIRECTORIOS.

PARA QUE SE GUARDEN O BORREN LOS ELEMENTOS DEL PERFIL DEPEDEN DE LA FUNCION ACTUALIZARDATOIND() QUE NO LOGRO QUE FUNCIONE, PORQUE LO QUE HACE ES NO DETETAR EL NOMBRE DE LO QUE ESTAMOS TRABAJANDO
Y DETECTA UN HUECO EN BLANCO, POR LO QUE BORRA O ESCRIBE ESO EN LA BASE DE DATOS.    <--- ESTO PUEDE SER LO MÁS IMPORTANTE

FALTARÍA MODIFICAR EL METODO PROCESARRESPUESTA PARA QUE TOME LA INFORMACIÓN NECESARIA DEL LASTFM, MOSTRARLA EN CONDICIONES Y AÑADIR EL CONTENIDO A INFOWINDOW DEL GOOGLE MAPS

HAY QUE ENGANCHAR EL PIE DE PÁGINA CON LA INFORMACIÓN, HE PENSADO QUE EN VEZ DE HACER UN PDF PODEMOS COLGAR TODA LA INFORMACIÓN EN "SOBRE GEOMUSIC Y NOSOTROS"

LA COMPROBACIÓN DE CAMPOS DEL REGISTRO PODRÍA SER ALGO INTERESANTE DE HACER

*/

var geocoder;
var map;
var infowindow;
var tipobusqueda;
var array_misgrupos;

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
	var newdiv4=document.createElement("div");
	var newul=document.createElement("ul");
	var newbutton=document.createElement("span");
	var newspinner=document.createElement("span");
	var newtittle=document.createElement("span");

	eliminarElemento('marcos');
	eliminarElemento('botones');

	newdiv1.id = 'map_canvas';
	newdiv2.id='text_map';
	newdiv3.id='tabla_result';
	newdiv4.id='nombre_tabla';
	newspinner.id='spinner';
	newul.id='ul_tabla';
	newbutton.id='boton_volver';
	
	newdiv1.className = 'estilo_marco';
	newdiv2.className = 'estilo_marco';
	newdiv3.className= 'scroll';
	
	document.getElementById("profile").appendChild(newdiv1);
	initialize();
	
	newbutton.innerHTML='<input type="submit" class="estilo_boton text_boton" value="Buscar de nuevo" onclick="pasoaseleccion()">';
	
	newtittle.innerHTML='<h2 id="nombre_banda"><input id="boton_fav" type="submit" value="" onclick="">'+contenido+'</h2>';
	newspinner.innerHTML='<img id="spinner" alt="grupo" src="Images/spinner.gif">';
	
	newdiv2.appendChild(newbutton);	
	
	newdiv4.appendChild(newspinner);
	newdiv4.appendChild(newtittle);
	newdiv2.appendChild(newdiv4);
		
	newdiv3.appendChild(newul);	
	newdiv2.appendChild(newdiv3);

	document.getElementById("profile").appendChild(newdiv2);
}

function pasoperfil(){
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
	var newul=document.createElement("ul");
	var newtittle=document.createElement("span");

	newdiv1.id = 'map_canvas';
	newdiv2.id='text_map';
	newdiv3.id='tabla_result';
	newdiv4.id='nombre_tabla';
	newul.id='ul_tabla';
	
	newdiv1.className = 'estilo_marco';
	newdiv2.className = 'estilo_marco';
	newdiv3.className= 'scroll';
	
	document.getElementById("profile").appendChild(newdiv1);
	initialize();
	
	newtittle.innerHTML='<h2>Mis favoritos :)</h2>';

	newdiv4.appendChild(newtittle);
	newdiv2.appendChild(newdiv4);
		
	newdiv3.appendChild(newul);	
	newdiv2.appendChild(newdiv3);

	document.getElementById("profile").appendChild(newdiv2);

	ponerResultados(null, array_misgrupos);
	$('.boton_fav_ind').each(function(){
      		$(this).show();
	});
	actualizarDatosInd();
}

function pasoaseleccion(){
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
}

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
	$("#spinner").show();
	xmlHttp = new XMLHttpRequest(); 
	xmlHttp.onload = procesarRespuesta;
	xmlHttp.open( "GET", url, true );
	xmlHttp.send( null );
}

function procesarRespuesta(){
	$("#spinner").hide();
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
        	if (xmlHttp.responseText == "Not found"){
        	    alert('No se ha podido realizar la petición');
        	}
        	else{
        		var datos = eval ( "(" + xmlHttp.responseText + ")" );
        		if(datos.error > 0){
        			ponerResultados(null, [datos["message"]]);
        		}
        		else if(datos.events.total == 0){
        			ponerResultados(null, ["No hay conciertos"]);
        		}
        		
        		else{
        			var adress = 'Congo';
        			var geo = new Array;
        			var nombreArray = new Array;
        			var geoArray = [];
        			var nombreArray = [];
	        		var geoArray_part = [0,0];
	        		
	        		for(i in datos.events.event){
		        		geoArray_part[0] = datos.events.event[i].venue.location["geo:point"]["geo:lat"];
	        			geoArray_part[1] = datos.events.event[i].venue.location["geo:point"]["geo:long"];
	        			if(geoArray_part[0] != ''){
	        				geoArray = geoArray.concat(new google.maps.LatLng(geoArray_part[0], geoArray_part[1]));
	        				if(tipobusqueda==1){
	        					nombreArray = nombreArray.concat(datos.events.event[i].venue.location.city);
	        				}
	        				else{
	        					nombreArray = nombreArray.concat(datos.events.event[i].title);
	        				}
	        			}
	        			else{
	        				//geoString = geoString.concat(codeAddress(datos.events.event[i].venue["name"], datos.events.event[i].venue.location.city));
	        				//nombreString = nombreString.concat(datos.events.event[i].title);
	        			}
	        		}
	        		ponerResultados(geoArray, nombreArray);
    			}
        	}                    
    	}
    	else{
    		alert('Parece que algo no ha ido bien, por favor, vuelve a intentarlo.')
    	
    	}
	actualizarDatos();
	
}

function ponerResultados(geoArray, nombreArray){
	var ul_tabla = document.getElementById("ul_tabla")
	bounds = new google.maps.LatLngBounds();
 	for(i in nombreArray){
 		var newdiv=document.createElement("div");
 		newdiv.id = nombreArray[i];
		newdiv.className = 'elemento-resultado';
 		newdiv.innerHTML = nombreArray[i]+'<input class="boton_fav_ind" type="submit" name="'+nombreArray[i]+'" value="" onclick="">';
 		ul_tabla.appendChild(newdiv);
 		
 		if(geoArray != null){
			addMarker(geoArray[i], nombreArray[i]);
			bounds.extend(geoArray[i]);
		}
	}
	$('.boton_fav_ind').hide();
	map.fitBounds(bounds);	
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

function crearmapa(valor){
	tipobusqueda=valor;
	conseguirdatos();
	pasoamapa();
}

function initialize(){
	geocoder = new google.maps.Geocoder();
	infowindow = new google.maps.InfoWindow();
	var latlng = new google.maps.LatLng(0,0);
	var myOptions = {
		zoom: 1,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}

function addMarker(posicion, titulo){
	var marker = new google.maps.Marker({
		position: posicion,
        	map: map,
        	draggable:false,
      		animation: google.maps.Animation.DROP,
        	title: titulo
	});
	
	infoMarker(marker, titulo);
}

function infoMarker(marker, info){
	var newlatlng = new google.maps.LatLng(marker.getPosition().lat()+5, marker.getPosition().lng());
	var div = document.getElementById(info);
		
	google.maps.event.addListener(marker, 'click', function(){
		infowindow.setContent(info); 
		map.setCenter(newlatlng);
		infowindow.open(marker.get('map'), marker);	
	});
	
	
	google.maps.event.addDomListener(div, 'click', function(){
		infowindow.setContent(info); 
		map.setCenter(newlatlng);
		infowindow.open(marker.get('map'), marker);
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
}

function toggleBounce() {

    if (marker.getAnimation() != null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function comprobarBanda(){
	var nombre_banda=$('#nombre_banda').text();
	if(array_misgrupos.indexOf(nombre_banda) != -1){
		return true;
	}
	else{
		return false;
	}
}

function actualizarDatos(){
    	if(comprobarBanda()){
    		$("#boton_fav").unbind('click');
		$("#boton_fav").click(function(){eliminarfavorito();});
		$("#boton_fav").attr({'value': 'E'});
	}
	else{
		$("#boton_fav").unbind('click');
		$("#boton_fav").click(function(){guardarfavoritos();});
		$("#boton_fav").attr({'value': 'A'});
	}
}

function actualizarDatosInd(){
	
	$('.boton_fav_ind').each(function(){
		var nombre = $(this).attr("name");
		$('#nombre_banda').unbind('text');
		//$('#nombre_banda').text(nombre); //PARA QUE FUNCIONE TODO EL CÓDIGO SOLO HAY QUE HACER QUE LA ETIQUETA NOMBRE_BANDA TOME EN SU CAMPO TEXTO EL VALOR NOMBRE, PERO EN VEZ DE HACERLO SE QUEDA EN BLANCO :(
		//alert($('#nombre_banda').text());
		if(comprobarBanda()){
			$(this).unbind('click');
			$(this).click(function(){eliminarfavorito();});
			$(this).attr({'value': 'E'});
		}
		else{
			$(this).unbind('click');
			$(this).click(function(){guardarfavoritos();});
			$(this).attr({'value': 'A'});
		}
	});
}

function leergrupos(){
	var string_grupos;
	$.couch.session({
		success : 
			function(session) {
				var userCtx = session.userCtx;
				$.couch.userDb(function(db){
					var userDocId = "org.couchdb.user:"+userCtx.name;
					db.openDoc(userDocId, {
						success : 
							function(userDoc){
								string_grupos=userDoc.grupos;
								if(string_grupos != null){
									array_misgrupos = string_grupos.split(',');	
								}
								else{
									array_misgrupos = [];
								}
			                		}
					});
				});
			}
	});
}

function guardarfavoritos(){
	var nombre_banda=$('#nombre_banda').text();
	array_misgrupos.push(nombre_banda);		
	var string_grupos = array_misgrupos.join(",");
	
	$.couch.session({
		success:
			function(session) {
				var userCtx = session.userCtx;
				$.couch.userDb(function(db){
					var userDocId = "org.couchdb.user:"+userCtx.name;
					db.openDoc(userDocId, {
						success:
							function(userDoc){
								userDoc["grupos"] = string_grupos;
								db.saveDoc(userDoc, {
									success: 
										function(){
											actualizarDatos();
											actualizarDatosInd();
										}
								});
							}
					});
				});
			}
	});
}

function eliminarfavorito(){
	var nombre_banda=$('#nombre_banda').text();
	var ind = array_misgrupos.indexOf(nombre_banda);
	array_misgrupos.splice(ind, 1);		
	var string_grupos = array_misgrupos.join(",");

	$.couch.session({
		success:
			function(session){
				var userCtx = session.userCtx;
				$.couch.userDb(function(db){
					var userDocId = "org.couchdb.user:"+userCtx.name;
					db.openDoc(userDocId, {
						success: 
							function(userDoc){
								userDoc["grupos"] = string_grupos;
								db.saveDoc(userDoc, {
									success:
										function(){
											actualizarDatos();
											actualizarDatosInd();
										}
								});
							}
					});
           			});
         		}
	});
}


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
