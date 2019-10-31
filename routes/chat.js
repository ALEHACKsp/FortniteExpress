var express = require("express");
var router = express.Router();
const Request = require("request");

const WebSocket = require("ws");
const WebSocketServer = require("ws").Server;
wss = new WebSocket.Server({ port: 8090, clientTracking: true });

let previousHistory = [];
let connectionsCount;

var connections = [];
var id;

wss.on("connection", function connection(ws, req) {
  id = req.headers["sec-websocket-key"];
  connections.push({ wsId: id });

  // send live connection count to client
  connectionsCount = wss.clients.size;

  setInterval(() => {
    ws.send(connectionsCount);
  }, 800);

  // setInterval(() => {
  //   data = JSON.parse(connections);
  //   ws.send(data);
  // }, 800);

  // ws.on('open', function open() {
  // });

  ws.on("message", function incoming(data) {
    // collect message history to send over get("/") request on componentdidmount
    data1 = JSON.parse(data);
    previousHistory.push(data1);

    // broadcast messages to all users
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on("close", function close() {
    --connectionsCount;
  });

  router.get("/", function(req, res) {
    var options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };

    Request.get(options, (error, response, body) => {
      const data = previousHistory;
      res.status(200).send(data);
    });
  });
});

module.exports = router;
