import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Initialize Express app
const app = express();

// Create an HTTP server
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: { origin: '*' }, // Allow cross-origin requests
});

let count = 0;

// Handle Socket.IO connections
io.on('connection', (socket) => {
  count++;
  console.log('Connected:', count);

  // Notify all clients about the updated count
  io.emit('count', count); // Emit to all clients including the sender

  // Handle disconnection
  socket.on('disconnect', () => {
    count--;
    console.log('Disconnected:', count);
    io.emit('count', count); // Notify all clients about the updated count
  });
});

// Add a route for testing
app.get('/', (req, res) => {
  res.send('Hello User!');
});

// Start the server
const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
