const express = require("express");

const {notFound, errorHandler } = require("./middlewares/handler");
require("dotenv").config();
const {PORT} = require("./config/envConfig")

const app = express();

require("./operations/routes")(app);
require("./operations/db")(app)

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Resida app listening on port:" + PORT);
});
