"use strict";

const http = require("http"),
    express = require("express"),
    app = require('./config/express')(),
    config = require("./config/config")();

require("./config/passport")();
require("./config/database")(config.db);

http.createServer(app).listen(
        app.get("port"),
        () => {
            console.log(`Express Server escutando na porta ${ app.get("port") }`);
        }
);
