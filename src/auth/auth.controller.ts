import { Request, Response, Router } from "express";

const AuthController = Router();

/*
    TODO
    - AuthService.verify(req.body.email)
    - AuthService.exists(req.body.email) -> Check in db if email is already registered and generate a token
    - Return token
*/
AuthController.post('/', (req: Request, res: Response) => {
    return res.send('Here is your token')
})