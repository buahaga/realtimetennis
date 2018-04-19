const io = require('socket.io')();
const port = 3001;
const rooms = {};

io.on('connection', socket => {
  const roomName = socket.handshake.query.room;
  if (!rooms[roomName]) {
    rooms[roomName] = {
      clients: [],
      mainSocketId: null,
      playerNumber: false
    };
  }
  const room = rooms[roomName];

  if (!room.mainSocketId) {
    room.mainSocketId = socket.id;
    room.playerNumber = 1;
    room.clients.push(socket.id);
    console.log('firstPlayer go');
  } else if (room.clients.length === 1) {
    room.playerNumber = 2;
    room.clients.push(socket.id);
    console.log('secondPlayer go');
  } else {
    return;
  }

  socket.join(roomName);
  socket.emit('connected', room.playerNumber);

  socket.on('ball', ballData => {
    io.to(roomName).emit('ball_server', ballData);
  })
  socket.on('score', scoreData => {
    io. in (roomName).emit('score_server', scoreData);
  })
  socket.on('paddle', paddleData => {
    io. in (roomName).emit('paddle_server', paddleData);
  })
  socket.on('enemy_paddle', enemyPaddleData => {
    io. in (roomName).emit('enemy_paddle_server', enemyPaddleData);
  })

  socket.on('disconnect', () => {
    room.clients.splice(room.clients.indexOf(socket.id), 1);
    if (socket.id === room.mainSocketId) {
      room.mainSocketId = null;
    }
  })
})

io.listen(port);
console.log('Server on port ', port);
