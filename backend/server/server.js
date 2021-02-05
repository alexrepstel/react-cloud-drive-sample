const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session')
const app = express();
var cors = require("cors");
const users = require("./routes/users");
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const { addUser, removeUser, getUser, getUsersInRoom } = require('./config/chat_users.js');
const exjwt = require('express-jwt');
const keys = require('./config/keys');

io.on("connection", socket => {
  socket.on("join", joinParams => {
    var parameters = JSON.parse(joinParams);
    var name = parameters.name;
    var room = parameters.room;
    var previous_room = parameters.previous_chatroom;
    
    //update previous room state in case user switched room
    if(previous_room != ""){
      removeUser(socket.id);
      io.to(previous_room).emit('roomData', { room: previous_room, users: getUsersInRoom(previous_room) });
    }

      const {error, user} = addUser({id: socket.id, name, room});
      if(error == null){
        socket.join(user.room);
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
      }
      

  });

  socket.on("sendMessage", messageParams => {
    var parameters = JSON.parse(messageParams);
    var incomingMsg = parameters.message;

    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: incomingMsg, room: user.room });
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});



// var url = "mongodb://localhost:27017/TMS_db_new";
var url = keys.mongoURI;
const mongoose = require("mongoose"),
    usersSchema = require("./models/user");
    mongoose.connect(url,
      {
        useNewUrlParser: true
      });

const db = mongoose.connection;
db.once("open", () => {
  
});



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//JWT Middlewear to authenticate routes
const jwtMW = exjwt({
  secret: keys.secretOrKey
});


const usersRouter = require('./routes/users');
const driveAPI = require('./routes/driveAPI');
const usersPrivateRouter = require('./routes/usersPrivate');
const debugging = require('./routes/debugging');
app.use('/debug', debugging);

app.use('/driveAPI', jwtMW, driveAPI );
app.use('/users', usersRouter);
app.use('/usersPrivate', jwtMW, usersPrivateRouter);

const port = process.env.PORT || 5000; 
server.listen(port, () => console.log(`Server up and running on port ${port} !`));