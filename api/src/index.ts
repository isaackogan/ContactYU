import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Logger from "./modules/logger";
import {processPhone, ProfileData, profileDefaults} from "./modules/profiles";

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.PORT || "3000");
const host = process.env.HOST || "127.0.0.1";
const cors = require('cors')
const data = require("../public/data.json");


// Use CORS
app.use(cors());

/**
 * On Load
 */
app.listen(port, host, () => {
    Logger.INFO("HEY", 200);
    console.log(`Server is running at http://${host}:${port}`);
});

/**
 * Handle OPTIONS requests (CORS)
 */
app.options("*", (req, res) => {
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Length, X-Requested-With');
    res.send(200);
});

/**
 * Log requests
 */
app.use((req, res, next) => {

    // Log the request
    res.on(
        "finish",
        () => Logger.INFO("%s - \"REQUEST %s\"", res.statusCode, req.headers['x-forwarded-for'] || req.ip, req.originalUrl)
    );

    next();

});

/**
 * Server Running
 */
app.get('/', (req: Request, res: Response) => {
    res.send('Server Running!');
});


app.get("/profile", (req, res) => {


    if (!req.query?.id) {
        return res.status(400).json({"message": "ID not provided", "data": null});
    }

    let user: ProfileData = data[req.query.id.toString()];

    if (!user) {
        return res.status(404).json({"message": "User not found", "data": null});
    }

    let defaultsProcessed = profileDefaults(user);
    let phoneProcessed = processPhone(defaultsProcessed);

    return res.status(200).json({"message": "Retrieved user", "data": phoneProcessed});

})

