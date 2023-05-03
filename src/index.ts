import express, { Request, Response } from "express";
import { config } from "~/config";
import {JustifyController} from "~/justify/justify.controller";

const api = express();

api.get('/', (req: Request, res: Response) => {
    res.send('hello world');
})

api.use('/api/justify', JustifyController);


api.listen(process.env.PORT || 5000, () => console.log(`Running on port: ${config.API_PORT}`))