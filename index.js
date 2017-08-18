var osc = require("osc");
var ws = require("ws");

var soundplanePort = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 3123
});

soundplanePort.on("open", function () {
    console.log( soundplanePort.options.localPort);
});

soundplanePort.on("message", function(message){
    //console.log(message);
    if (socketPort){
        socketPort.send(message);
    };
});

soundplanePort.on("error", function (err) {
    throw new Error(err);
});

function mtof(m){
  return Math.pow(2, (m - 69)/12 ) * 440;
};

soundplanePort.open();


/////// Setting up websocket relay
var socketPort;
var wss = new ws.Server({
    port: 8081
});

wss.on("connection", function (socket) {
    console.log("A Web Socket connection has been established!");
    socketPort = new osc.WebSocketPort({
        socket: socket
    });

});
