// Copyright Chris Anderson 2011
// Apache 2.0 License
// jquery.couchProfile.js
// depends on md5, 
// jquery.couchLogin.js and requires.js
// 
// Example Usage (loggedIn and loggedOut callbacks are optional): 
//    $("#myprofilediv").couchProfile({
//        profileReady : function(profile) {
//            alert("hello, do you look like this? "+profile.gravatar_url);
//        }
//    });


(function($) {
	$.couchProfile = {};
	$.couchProfile.templates = {
		profileReady : '<div class="avatar">{{#gravatar_url}}<img src="{{gravatar_url}}"/>{{/gravatar_url}}<div class="name">{{nickname}}</div></div><p>Hello {{nickname}}!</p><div style="clear:left;"></div>',
		newProfile : '<form><p>Hola {{name}} !, para terminar de registrarte, debes rellenar estos campos obligatorios y pulsar go!</p><input class="estilo_input text_input" type="text" name="nickname" placeholder="nickname" value="">&nbsp&nbsp<div id="shogun"></div><br> <input class="estilo_input text_input" type="text" name="email" placeholder="email" value="">&nbsp&nbsp<div id="lao"></div><br><input id="go" class="estilo_boton text_boton" type="submit" value="go! &rarr;"><input type="hidden" name="userCtxName" value="{{name}}" id="userCtxName"></form><img id="map_canvas" class="estilo_marco" src="Images/concierto5.jpg">'
	};
    
	$.fn.couchProfile = function(session, opts) {
		opts = opts || {};
		var templates = $.couchProfile.templates;
		var userCtx = session.userCtx;
		var widget = $(this);
		// load the profile from the user doc
		var db = $.couch.db(session.info.authentication_db);
		var userDocId = "org.couchdb.user:"+userCtx.name;
		db.openDoc(userDocId, {
			success : function(userDoc) {
				var profile = userDoc["profile"];
				if (profile) {
					profile.name = userDoc.name;
					profileReady(profile);
				}
				else {
                    			newProfile(userCtx)
				}
			}
		});
		function profileReady(profile) {
			$('#profile').empty();
			$.ajax({
				url:'seleccion.html', global:false, success: function(data){
					$("#profile").html(data);
				}        
			});
			$("#profile").show();
			$("#etiqueta").show();
		};
		function storeProfileOnUserDoc(newProfile) {
			// store the user profile on the user account document
			$.couch.userDb(function(db) {
				var userDocId = "org.couchdb.user:"+userCtx.name;
				db.openDoc(userDocId, {
					success : function(userDoc) {
						userDoc["profile"] = newProfile;
						userDoc["grupos"] = null;
						db.saveDoc(userDoc, {
							success : function() {
								newProfile.name = userDoc.name;
								profileReady(newProfile);
							}
						});
					}
				});
			});
		};
		function newProfile(userCtx) {
			widget.html($.mustache(templates.newProfile, userCtx));
			$("#profile").show();
			widget.find("form").submit(function(e) {
				e.preventDefault();
				var form = this;
				var name = $("input[name=userCtxName]",form).val();
				//Antes de crear ningun perfil, vamos a ver si el usuario se ha equivocado o no.
				var shino=$("input[name=nickname]",form).val();
				var shina=$("input[name=email]",form).val();
				var mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;	
				if (shino == "" || shino == null){	
					tuttobene=1;
					$("#shogun").html("Es necesario introducir algun nombre ");
	 	     		        $("#shogun").show();
	   				setTimeout(function() { $("#shogun").hide(); }, 1500);
				}else if(shino != $("input[name=userCtxName]",form).val() ){
					tuttobene=1;
					$("#shogun").html("El nombre introducido no coindice con el original ");
	 	     		        $("#shogun").show();
	   				setTimeout(function() { $("#shogun").hide(); }, 1500);
				}else if(shina == "" || shina == null){
					tuttobene=1;
					$("#lao").html("Es necesario un email para registrarse ");
	 	     		        $("#lao").show();
	   				setTimeout(function() { $("#lao").hide(); }, 1500);
				}else if(!mail.test(shina)){
					tuttobene=1;
					$("#lao").html("El email introducido no es valido");
	 	     		        $("#lao").show();
	   				setTimeout(function() { $("#lao").hide(); }, 1500);
				}else{
					if(tuttobene='0'){
						var newProfile = {
							nickname : $("input[name=nickname]",form).val(),
							email : $("input[name=email]",form).val(),
						};
						storeProfileOnUserDoc(newProfile);
						return false;
					}

				}//FIn de este else exterior
			});  
		};
	}
})(jQuery);
