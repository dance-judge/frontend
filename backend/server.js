//imports
const express = require('express')
const cors = require('cors')
const expressWs = require('express-ws');

const WebSocket = require('ws');

//locate app via express
const app = express()

const port = 5500; //set up the port

app.use(cors()) //multi-domain on one pc (cors registration)
app.use(express.json()) //api endpoint in JSON

//api rotes register
const matchesRouter = require('./api_routes/api_matches')
const userRouter = require('./api_routes/api_auth');
const matches = require('./api_routes/data/matches');

app.use('/matches', matchesRouter)
app.use('/auth', userRouter)

// Create an HTTP server using Express
const server = app.listen(port, () => {
    console.log(`HTTP server is running on port ${port}`);
  });


// Create a WebSocket server
const wss = expressWs(app, server).getWss();

// Store connected clients
const clients = new Set();

// Broadcast a message to all connected clients
function broadcastMessage(message) {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Handle new client connections
wss.on('connection', ws => {
  // Add the client to the set of connected clients
  clients.add(ws);

  // Handle incoming messages from the client
  ws.on('message', message => {
    // Broadcast the received message to all clients
    // console.log(JSON.parse(message.toString()))
    matches.splice(0,matches.length)
    let receivedMessages = JSON.parse(message.toString())
    for (const key in receivedMessages) {
      matches.push(receivedMessages[key])
    }
    // message.body.forEach(element => {
      
    // });

    broadcastMessage(JSON.stringify(matches));
  });

  // Handle client disconnection
  ws.on('close', () => {
    // Remove the client from the set of connected clients
    clients.delete(ws);
  });
});

    
// Define WebSocket upgrade route
app.ws('/websocket', (ws, req) => {
    
});