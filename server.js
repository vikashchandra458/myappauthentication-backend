const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require('./_middleware/error-handler')
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");


var options = {
    swaggerOptions: {
        authAction: {
            JWT: {
                name: "JWT",
                schema: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                    description: "",
                },
                value: "Bearer <JWT>",
            },
        },
    },
};

app.use(
    "/api",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use("/users", require("./API/users/users.controller"));

app.use(errorHandler);


const port = 3000;
app.listen(port, () => console.log("Server listening on port " + port));