const WebSocket = require('ws');
const fs = require('fs');
const http = require('http');
const express = require("express");
const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(__dirname));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (data) => {
        console.log(`Received: ${data}`);
        fs.writeFile('./uploaded_file.txt', data, (err) => {
            if(err) {
                console.log(err)
            } else {
                console.log('File saved!');
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(8080, () => {
    console.log(`Server listening on http://192.168.1.8:8080`);
});
