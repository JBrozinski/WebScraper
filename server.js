const mongoose = require("mongoose");
const express = require("express");
const bodyparser = require("body-parser");
const PORT = process.env.PORT || 3000;
// const db = require("./models");
const app = express();
const hbars = require("express-handlebars");
const db = process.env.MONGODB_URI || "mongodb://localhost/webScraper";

const router = express.Router();
require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", hbars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyparser.urlencoded({
    extended: false
}));

app.use(router);
app.listen(PORT, function () {
    console.log("listening on port:" + PORT);
});

mongoose.connect(db, function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection is successful");
    }
});

// app.use(express.json());

// mongoose.Promise = Promise
// mongoose.connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
// });

