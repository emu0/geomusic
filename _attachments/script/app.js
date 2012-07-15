// Apache 2.0 J Chris Anderson 2011
$(function() {   	
	$("#account").couchLogin({
		loggedIn : function(r) {
			//$("#account").show();
			$("#profile").couchProfile(r, {
				profileReady : function(profile) {},
				newProfile : function(profile) {}
			});
			leergrupos();
		},
		loggedOut : function() {
			$("#profile").hide();
			$("#etiqueta").hide();
		}
	});
});
