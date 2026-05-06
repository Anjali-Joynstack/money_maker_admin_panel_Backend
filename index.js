require("dotenv").config();
const express = require("express");
const cors = require("cors");
const serverConfig = require("./src/config/server.config")

const app = express();
app.use(express.json());




const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3001",  // replace your actual domain
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);




app.listen(serverConfig.PORT, () => {
    console.log(`Server started on port: ${serverConfig.PORT}`);

});


