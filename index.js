var osc = require("osc");

var soundplanePort = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 3123
});

soundplanePort.on("open", function () {
    console.log( soundplanePort.options.localPort);
});

soundplanePort.on("message", function(message){
    console.log(message);
});

soundplanePort.on("error", function (err) {
    throw new Error(err);
});

function mtof(m){
  return Math.pow(2, (m - 69)/12 ) * 440;
};

soundplanePort.open();


