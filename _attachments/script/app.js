/** 
* APP.JS
* This document was modified by Granada University's students Ángel Bueno, Emilio Martínez and Mª Soledad Pascual for a GEOMUSIC proyect in 'High Performances Architecture' subject, based in the Apache 2.0 J. Chris Anderson code. 
* More info: http://http://geneura.ugr.es/~jmerelo/asignaturas/AAP/ and http://geomusic.iriscouch.com/geomusic/_design/geomusic/index.html
* This code has been programmed to be Free Software and it can be used by who want it :).
* Granada, July 2012.
**/

// 
$(function() {
	//Hacemos el login
	$("#account").couchLogin({
		//Si se logea controlamos el perfil del usuario
		loggedIn : function(r) {
			$("#profile").couchProfile(r, {
				//Diferenciamos si queremos un nuevo usuario o si tenemos preparado el usuario desde la base de datos
				profileReady : function(profile) {},
				newProfile : function(profile) {}
			});
			//En cuanto se logea se realiza una lectura de los grupos de la DB del usuario
			leergrupos();
		},
		loggedOut : function() {
			//Cuando nos desconectamos ocultamos elementos innecesarios.
			$("#profile").hide();
			$("#etiqueta").hide();
		}
	});
});
