const { io } = require('../index');
import authController from '../controllers/auth.controller'

// Mensajes de Sockets
io.on('connection', (socket: any) => {

  socket.on('nuevoConectado', (user:any) =>{
    authController.setOnlineStatus(user.id, true);
    socket.username = user.username;
    socket._id = user.id;
    socket.join(user.id);
    console.log(user.username + " se ha conectado");
    console.log("Salas", user.id);
  });

  socket.on('nuevoUsuario', (user:any) => {
    socket.emit('nuevoUsuario', user);
  })

  socket.on('nuevaNotificacion', (data:any) => {
    const notification = {
    type: data.type,
    description: data.description,
    status: 0,
    origen: data.origen,
    image: data.image
    }
    
    socket.in(data.destino).emit('nuevaNotificacion', notification);
  });

  socket.on('responseFriend', (notification:any) => {
    socket.in(notification.destino).emit('responseFriend', notification);
  })

  socket.on('disconnect', function(){
    authController.setOnlineStatus(socket._id, false);
    console.log(socket.username + " se ha desconectado");
    //io.emit('usuarioDesconectado', {user: socket.username, event: 'left'});  
  });

  socket.on('nuevaSala', (chatid : any) =>{
    socket.join(chatid);
    //chatId = chatid;
    console.log("Sala " + chatid + " creada");
  });
  /*socket.on('set-name', (name: any) => {
    socket.username = name;
    io.emit('users-changed', {user: name, event: 'joined'});    
  });*/
  
  /*socket.on('send-message', (message: any) => {
    socket.to(chatId).emit('message', {msg: message.text, user: socket.username, createdAt: new Date()});    
  });*/
});
