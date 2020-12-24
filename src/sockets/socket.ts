const { io } = require('../index');
import authController from '../controllers/auth.controller'

// Mensajes de Sockets
io.on('connection', (socket: any) => {
  console.log("conectado");

  socket.on('nuevoConectado', (user:any) =>{
    authController.setOnlineStatus(socket.id, true);
    socket.join(user.id);
    console.log("El nuevo usuario es " + user.username);
  });

  socket.on('nuevaNotificacion', (notification:any) => {
    console.log("Sala destino", notification.destino);
    console.log("Salas del socket", socket.rooms);
    io.in(notification.destino).emit('nuevaNotificacion', notification);
  })

  socket.on('disconnect', function(){
    authController.setOnlineStatus(socket.id, false);
    console.log(socket);
    console.log("Desconectado el usuario " + socket.username);
    io.emit('usuarioDesconectado', {user: socket.username, event: 'left'});  
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
