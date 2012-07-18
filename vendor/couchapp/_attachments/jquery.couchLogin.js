// Copyright Chris Anderson 2011
// Apache 2.0 License
// jquery.couchLogin.js
// 
// Example Usage (loggedIn and loggedOut callbacks are optional): 
//    $("#mylogindiv").couchLogin({
//        loggedIn : function(userCtx) {
//            alert("hello "+userCtx.name);
//        }, 
//        loggedOut : function() {
//            alert("bye bye");
//        }
//    });

(function($) {

	var templates = {
        	adminParty : '<p><strong>Admin party, everyone is admin!</strong> Fix this in <a href="/_utils/index.html">Futon</a> before proceeding.</p>',
		loggedOut : 	'<div id="marco1"> <img id="imagen_login" src="Images/concierto.jpg">' +
					'<div id="marco2">'+
						'<form class="login" class="marco_index">'+
							'<fieldset><legend>Log in</legend>'+
							'<input class="estilo_input text_input" type="text" autocorrect="off" autocapitalize="off" placeholder="Nombre" value="" name="name"><br>'+
							'<input class="estilo_input text_input" type="password" placeholder="contraseña" value="" name="password"><br>'+
							'<input  class="estilo_boton text_boton" title="ok" type="submit" value="Login">'+
							'<span id="mensaje_login"></span></fieldset>'+
						'</form>'+
						'<form class="signup" class="marco_index">'+
							'<fieldset><legend>Sign up</legend>'+
							'<input class="estilo_input text_input" type="text" autocorrect="off" autocapitalize="off" placeholder="Introduce un nombre" value="" name="name"><br>'+
							'<input class="estilo_input text_input" type="password" placeholder="Password" value="" name="password"><br>'+
							'<input  class="estilo_boton text_boton" title="ok" type="submit" value="Signup">'+
							'<span id="mensaje_reg"></span></fieldset>'+
						'</form>'+
					'</div>'+
				'</div>'+
		                '<br/><br/><div id="wahan"></div>',
		
		loginForm : '<form class="login"><label for="name">Name</label> <input type="text" name="name" value="" autocapitalize="off" autocorrect="off"><label for="password">Password</label> <input type="password" name="password" value=""><input type="submit" value="Login"><a href="#signup">or Signup</a></form>',
		signupForm : '<form class="signup"><label for="name">Name</label> <input type="text" name="name" value="" autocapitalize="off" autocorrect="off"><label for="password">Password</label> <input type="password" name="password" value=""><input type="submit" value="Signup"><a href="#login">or Login</a></form>'
	};
	$.fn.couchLogin = function(opts) {
		var elem = $(this);
		opts = opts || {};
		function initWidget() {
			$.couch.session({
			success : 
				function(session) {
					var userCtx = session.userCtx;
						if (userCtx.name) {
							elem.empty();
							elem.append(loggedIn(session));
							if (opts.loggedIn) {
								opts.loggedIn(session)
							}
						}
						else if (userCtx.roles.indexOf("_admin") != -1){
							elem.html(templates.adminParty);
						}
						else{
							elem.html(templates.loggedOut);
							if (opts.loggedOut){
								opts.loggedOut()
							}
                    				};
                		},
            		});
        	};
        	initWidget();
        
		function doLogin(name, pass) {
			$.couch.login({
				name:name, 
				password:pass,	
				success:initWidget, 
				error: function(){

					if(name==null || name == ""){
						$("#mensaje_login").html("Has escrito mal el nombre :(");
				                $("#mensaje_login").show();
	   					setTimeout(function() { $("#mensaje_login").hide(); }, 1500);
					}else if(pass==null || pass == ""){
						$("#mensaje_login").html("Has escrito mal el password :(");
				                $("#mensaje_login").show();
	   					setTimeout(function() { $("#mensaje_login").hide(); }, 1500);
					}else{
						$("#mensaje_login").html("Te has equivocado :(");
						$("#mensaje_login").show();
	   					setTimeout(function() { $("#mensaje_login").hide(); }, 1500);
					}	
				}//FIn del error
			}); 
			
		};
		
		elem.delegate("a[href=#signup]", "click", function() {
			elem.html(templates.signupForm);
			elem.find('input[name="name"]').focus();
			return false;
		});
		
		elem.delegate("a[href=#login]", "click", function() {
			elem.html(templates.loginForm);
			elem.find('input[name="name"]').focus();
			return false;
		});
		
		elem.delegate("a[href=#logout]", "click", function() {
			$.couch.logout({
				success : function(){
					$('#profile').empty();
					initWidget();
					sole=0;
					emilio=0;
					angel=0;

				}
			});//FIn del logout
			return false;
		});
		
		elem.delegate("form.login", "submit", function() {
			doLogin($('input[name="name"]', this).val(), 
			$('input[name="password"]', this).val());
			return false;
		});
		
		elem.delegate("form.signup", "submit", function() {
			var name = $('input[name="name"]', this).val(),  
			pass = $('input[name="password"]', this).val();
			$.couch.signup({name : name}, pass, {
				success : function() {

					if(name==null || name==""){
						$("#mensaje_reg").html("Escribe un nombre :(");
						$("#mensaje_reg").show();
	   					setTimeout(function() { $("#mensaje_reg").hide(); }, 2000);
					}else if (pass==null || pass==""){
						$("#mensaje_reg").html("Escribe un password :(");
						$("#mensaje_reg").show();
	   					setTimeout(function() { $("#mensaje_reg").hide(); }, 2000);
					}else{
						doLogin(name, pass)}
					},
				error: function(){
					$("#mensaje_reg").html("Te has equivocado :(");
					$("#mensaje_reg").show();
	   				setTimeout(function() { $("#mensaje_reg").hide(); }, 2000);
				}
			});
			return false;      
		});
	}
	function loggedIn(r) {
		/*$("#info").html('<div id="account"><span>' + uri_name + ' </a>| <a href="#logout">Logout?</a></span></div>');*/
		var auth_db = encodeURIComponent(r.info.authentication_db)
			, uri_name = encodeURIComponent(r.userCtx.name)
			, span = $('<span id="usuarios">' + uri_name + ' </a>| <a href="#logout" class="estilo_boton text_boton boton_logout">Logout</a></span>');
		$('a.name', span).text(r.userCtx.name); // you can get the user name here
		$("#mensaje_login").hide();
		$("#mensaje_reg").hide();
		
		return span;
    	}
})(jQuery);
