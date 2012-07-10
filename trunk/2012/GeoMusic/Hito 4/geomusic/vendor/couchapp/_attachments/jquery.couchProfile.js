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
        newProfile : '<form><p>Hola {{name}} !, para terminar de registrarte, debes rellenar estos campos obligatorios y pulsar go!</p><input class="estilo_input text_input" type="text" name="nickname" placeholder="nickname" value=""> <br> <input class="estilo_input text_input" type="text" name="email" placeholder="email" value=""><br><input id="go" class="estilo_boton text_boton" type="submit" value="go! &rarr;"><input type="hidden" name="userCtxName" value="{{name}}" id="userCtxName"></form>'
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
                var profile = userDoc["couch.app.profile"];
                 $("#profile").show();
                if (profile) {
                    profile.name = userDoc.name;
                    profileReady(profile);
                } else {
                    newProfile(userCtx)
                }
            }
        });
        
        /*$('#go').click(function(){
        	
        	$.ajax({
        	url:'seleccion.html', success: function(data){
        		$("#profile").html(data);
        	}        
        });	
        	
        
        });
       */ 
        
        function profileReady(profile) {
      
		/*widget.html($.mustache(templates.profileReady, profile));
		if (opts.profileReady) {opts.profileReady(profile)};*/
		$.ajax({
        	url:'seleccion.html', global:false, success: function(data){
        		$("#profile").html(data);
        	}        
        });
		
        };
        
        function storeProfileOnUserDoc(newProfile) {
            // store the user profile on the user account document
            $.couch.userDb(function(db) {
              var userDocId = "org.couchdb.user:"+userCtx.name;
              db.openDoc(userDocId, {
                success : function(userDoc) {
                  userDoc["couch.app.profile"] = newProfile;
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
            widget.find("form").submit(function(e) {
            e.preventDefault();
            var form = this;
                var name = $("input[name=userCtxName]",form).val();
                var newProfile = {
                  rand : Math.random().toString(), 
                  nickname : $("input[name=nickname]",form).val(),
                  email : $("input[name=email]",form).val(),
                };
                storeProfileOnUserDoc(newProfile);
              return false;
            });
             
        };
    }
})(jQuery);
