"use strict";

const http = require("http"),
    express = require("express"),
    app = require('./config/express')();

require("./config/passport")();
require("./config/database")("mongodb://localhost/contatooh");

http.createServer(app).listen(
        app.get("port"),
        () => {
            console.log(`Express Server escutando na porta ${ app.get("port") }`);
        }
);
