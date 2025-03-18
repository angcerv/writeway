const express = require('express'),
    server = express(),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes"),
    projectRoutes = require("./routes/projectRoutes"),
    chapterRoutes = require("./routes/chapterRoutes"),
    templateRoutes = require("./routes/templateRoutes"),
    sheetRoutes = require("./routes/sheetRoutes"),
    commentsRoutes = require("./routes/commentsRoutes");

const port = 3000,
    dbName = "writewaydb",
    // dbConnectionUrl = 'mongodb://127.0.0.1:27017/'+ dbName;
    dbConnectionUrl = 'mongodb+srv://dbUser:db4tlasPass@clusterwr.15ld8.mongodb.net/'+ dbName;
    

function init() {

    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.listen(port, () => {
        mongoose.connect(dbConnectionUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
            if (error) {
                throw error;
            }
            console.log("Connected to '" + dbName + "'!");
        });
    });

    server.use("/users", userRoutes);
    server.use("/projects", projectRoutes);
    server.use("/chapters", chapterRoutes);
    server.use("/templates", templateRoutes);
    server.use("/sheets", sheetRoutes);
    server.use("/comments", commentsRoutes);

    server.use((req, res, next) => {
        const error = new Error("Not found");
        error.status = 404;
        next(error);
    });

    server.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        });
    });
}

init();
