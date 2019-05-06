
const http = require("http");
const Tracker = require("fibos-tracker");

Tracker.Config.DBconnString = "mysql://root:123456@127.0.0.1/chain_data"
const tracker = new Tracker();
    
tracker.use(require("./hooks.js"));

let httpServer = new http.Server("", 8080, [
    (req) => {
        req.session = {};
    }, {
        '/app': tracker.app,
        "*": [function(req) {}]
    },
    function(req) {}
]);

httpServer.crossDomain = true;
httpServer.run(() => { });

console.notice("http server run port: 8080");