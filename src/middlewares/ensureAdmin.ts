import { Request, Response, NextFunction } from "express";

export function ensureAdmin(
    request: Request, 
    response: Response, 
    next: NextFunction) {

    // Validação de usuário adm S/N
    const admin = true;

    if(admin) {
        return next();
    }
    
    return response.status(401).json({
        error: "Somente Adm",
    });
}



