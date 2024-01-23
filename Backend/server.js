const app = require('express')();
const express =require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");
const cors = require('cors');
const server = require('http').createServer(app);
const PORT = process.env.PORT || 7000;
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const API = process.env.DATABASE_URL;

mongoose.set("strictQuery", false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const Auth = require("./Middleware/Authorization");
const AccountRoute = require("./Routes/accountRoute");
const DoctorMapping = require("./Routes/doctorRoute");
const Products = require("./Routes/productRoute");
const OrderRoute = require("./Routes/orderRoute");
const HistoryRoute = require("./Routes/historyRoute")

app.use("/api/v1", AccountRoute);
app.use("/api/v1" , Products);
app.use("/api/v1" ,Auth ,DoctorMapping );
app.use("/api/v1", Auth, OrderRoute);
app.use("/api/v1" , Auth , HistoryRoute);

io.on('connection', (socket) => {
  socket.emit('me', socket.id);

  socket.on('updateMyMedia', (data) => {
    io.to(data.userToUpdate).emit('updateUserMedia', data.data);
  });

  socket.on('calluser', ({ userToCall, from, name, signal, documentId }) => {
    io.to(userToCall).emit('calluser', { signal, from, name, documentId });
  });

  socket.on('answercall', (data) => {
    io.to(data.to).emit('updateUserMedia', {
      type: data.type,
      mediaStatus: data.mediaStatus,
    });
    io.to(data.to).emit('callaccepted', data.signal,data.name);
  });

  socket.on('send-changes', (delta, userId) => {
    // console.log(userId)
    io.to(userId).emit('recieve-changes', delta);
  });

  socket.on('send-message', (data) => {
    io.to(data.userToSend).emit('recieve-message', data.data);
  });

  socket.on('callended', (userToUpdate) => {
    io.to(userToUpdate).emit('callended');
  });

  // socket.on('disconnect', () => {
  //   socket.broadcast.emit('callended');
  // });
  
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

// server.listen(PORT, () => {
//   console.log(`Server is running at port ${PORT}`);
// });

async function main() {
  console.log(API )
  await mongoose.connect(API);
  console.log("connected to database");
  server.listen(PORT, () => console.log(`Server is live at PORT => ${PORT}`));
}
main();