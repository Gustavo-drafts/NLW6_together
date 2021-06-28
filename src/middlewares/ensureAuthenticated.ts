import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface IPayload{
    sub: string;
}


export function ensureAthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction) {

    // Receber o token
    const authToken = request.headers.authorization;
    
    // Validar se token está preenchido
    if (!authToken) { 
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");
    
    
    try {
        // Validar se tokren é válido
        const { sub } = verify( token , "b6b06fe1185c8fb242590867b5178698") as IPayload;

        // Recuperar informações do usuário
        request.user_id = sub;


        return next();
    } catch (err) {
        return response.status(401).end();
    }      
    
}