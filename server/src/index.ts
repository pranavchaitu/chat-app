import http from "http"
import { WebSocket, WebSocketServer } from "ws"

const server = http.createServer((req,res) => {
  console.log(`%s Received request for %s`,new Date(),req.url)
  res.end("Hello from the server")
})

const wss =  new WebSocketServer({ server })

wss.on('connection',(socket) => {
  socket.on('error',console.error)
  socket.on('message',(data) => {
    wss.clients.forEach((client) => {
      if(client.readyState == WebSocket.OPEN) {
        client.send(data,{ binary : false }) 
      }
    })
  })
})

server.listen(8080,() =>  {
  console.log("%s server isn listening at port 8080",new Date());
})