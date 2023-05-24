const express = require("express");
const { router } = require("./routes/index");
const server = express();

server.use(express.json());
server.use(router);

server.use("/public", express.static(__dirname + "/public"));

module.exports = { server };
