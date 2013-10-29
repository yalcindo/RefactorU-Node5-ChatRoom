$(function(){
	var source = $("#message-template").html();
	var notify = $("#notify-template").html();
	var users = $("#users-template").html();
	var messageTemplate = Handlebars.compile(source);
	var notifyTemplate  =Handlebars.compile(notify);
	var userTemplate=Handlebars.compile(users);
	$room = $('#room')



	// connect the socket.io server
	var socket = io.connect('http://localhost')
	//define socket events
	
	socket.on("connect",function(){
			
	    $('#message-input').on('keyup', function(e){
			$el = $(this)
			if(e.which === 13){
				socket.emit('clientMessage', $el.val());
				$el.val('');
			}
		});
	    $('#username').on('keyup', function(e){
			$el = $(this)
			if(e.which === 13){
				socket.emit('clientName', $el.val());
				$el.val('');
			}
		});

    });

	// attach events
	socket.on("serverMessage",function(data){
		$room.append(messageTemplate({user:data.id,message:data.message}));
	});
  	socket.on("connected",function(data){
  	
		$room.append(notifyTemplate({user:data.id,message:data.message}));
	});
    socket.on("disconnected",function(data){
		$room.append(notifyTemplate({user:data.id,message:data.message}));
	});
   	socket.on("id",function(data){
		$("#users").html(userTemplate({users:data}));
	});

});
