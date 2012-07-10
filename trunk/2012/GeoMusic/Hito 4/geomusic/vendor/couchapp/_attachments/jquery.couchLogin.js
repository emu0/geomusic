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
    $.fn.couchLogin = function(opts) {
        var elem = $(this);
        opts = opts || {};
        function initWidget() {
            $.couch.session({
                success : function(session) {
                    var userCtx = session.userCtx;
                    if (userCtx.name) {
                        elem.empty();
                        elem.append(loggedIn(session));
                        if (opts.loggedIn) {opts.loggedIn(session)}
                    } else if (userCtx.roles.indexOf("_admin") != -1) {
                        elem.html(templates.adminParty);
                    } else {
                        elem.html(templates.loggedOut);
                        if (opts.loggedOut) {opts.loggedOut()}
                        $("#account").css({'float':'none'});
                    };
                }
            });
        };
        initWidget();
        
        function doLogin(name, pass) {
            $.couch.login({name:name, password:pass, success:initWidget});     
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
            $.couch.logout({success : initWidget});
            return false;
        });
        elem.delegate("form.login", "submit", function() {
            doLogin($('input[name=name]', this).val(),  
                $('input[name=password]', this).val());
            return false;
        });
        elem.delegate("form.signup", "submit", function() {
            var name = $('input[name=name]', this).val(),  
                pass = $('input[name=password]', this).val();
            $.couch.signup({name : name}, pass, {
                success : function() {doLogin(name, pass)}
            });
            return false;      
        });
    }
    var templates = {
        adminParty : '<p><strong>Admin party, everyone is admin!</strong> Fix this in <a href="/_utils/index.html">Futon</a> before proceeding.</p>',
        
        loggedOut : '<div id="marco1" class="estilo_marco"> <img id="imagenmapa" src="Images/concierto.jpg"></div> <div id="marco2"> <form class="login" class="marco_index"><fieldset>	<legend>Log in</legend>	<input class="estilo_input text_input" type="text" autocorrect="off" autocapitalize="off" placeholder="Nombre" value="" name="name"><br>	<input class="estilo_input text_input" type="password" placeholder="contraseña" value="" name="password"><br>	<input  class="estilo_boton text_boton" title="ok" type="submit" value="Login">	</fieldset></form>	<form class="signup" class="marco_index"><fieldset><legend>Sign up</legend>	<input class="estilo_input text_input" type="text" autocorrect="off" autocapitalize="off" placeholder="Introduce un nombre" value="" name="name"><br>	<input class="estilo_input text_input" type="password" placeholder="Password" value="" name="password"><br><input  class="estilo_boton text_boton" title="ok" type="submit" value="Signup"><br></fieldset></form></div>',
        
        loginForm : '<form class="login"><label for="name">Name</label> <input type="text" name="name" value="" autocapitalize="off" autocorrect="off"><label for="password">Password</label> <input type="password" name="password" value=""><input type="submit" value="Login"><a href="#signup">or Signup</a></form>',
        
        signupForm : '<form class="signup"><label for="name">Name</label> <input type="text" name="name" value="" autocapitalize="off" autocorrect="off"><label for="password">Password</label> <input type="password" name="password" value=""><input type="submit" value="Signup"><a href="#login">or Login</a></form>'
    };
    
    function loggedIn(r) {
/*      $("#info").html('<div id="account"><span>' + uri_name + ' </a>| <a href="#logout">Logout?</a></span></div>');*/
        var auth_db = encodeURIComponent(r.info.authentication_db)
        , uri_name = encodeURIComponent(r.userCtx.name)
        , span = $('<span>' + uri_name + ' </a>| <a href="#logout">Logout?</a></span>');
        $('a.name', span).text(r.userCtx.name); // you can get the user name here
      
       
	$.ajax({
        	url:'seleccion.html', global:false, success: function(data){
        		$("#profile").html(data);
        	}        
        });
        $("#account").css({'float':'right', 'position':'relative'});
        $("#profile").show();
        
       return span;
    }
})(jQuery);
