const fibos = require("fibos");

const CONFIG = {
    node_dir: "./node",
    DBconnString: "mysql://root:123456@127.0.0.1/chain_data"
}

fibos.config_dir = CONFIG.node_dir;
fibos.data_dir = CONFIG.node_dir;

fibos.load("http", {
    "http-server-address": "0.0.0.0:8871",
    "access-control-allow-origin": "*",
    "http-validate-host": false,
    "verbose-http-errors": true
});

fibos.load("net", {
    'p2p-listen-endpoint': "0.0.0.0:9876",
    "p2p-peer-address": ["p2p.testnet.fo:80"]
});

fibos.load("producer");

fibos.load("chain", {
    "delete-all-blocks": true,
    "genesis-json": "./genesis.json"
});

fibos.load("chain_api");
fibos.load("emitter");

const Tracker = require("fibos-tracker");
Tracker.Config.DBconnString = CONFIG.DBconnString;
const tracker = new Tracker();

tracker.use(require("./hooks.js"));

tracker.emitter(fibos);

fibos.start();