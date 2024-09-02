"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const server = http_1.default.createServer((req, res) => {
    console.log(`%s Received request for %s`, new Date(), req.url);
    res.end("Hello from the server");
});
const wss = new ws_1.WebSocketServer({ server });
wss.on('connection', (socket) => {
    socket.on('error', console.error);
    socket.on('message', (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState == ws_1.WebSocket.OPEN) {
                client.send(data, { binary: false });
            }
        });
    });
});
server.listen(8080, () => {
    console.log("%s server isn listening at port 8080", new Date());
});
