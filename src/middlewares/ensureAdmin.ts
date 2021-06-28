import { getCustomRepository } from 'typeorm';
import { Request, Response, NextFunction } from "express";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(
    request: Request, 
    response: Response, 
    next: NextFunction) {


        const { user_id } = request;

        const usersRepositories = getCustomRepository(UsersRepositories);
        
        const { admin } = await usersRepositories.findOne(user_id);

    // Verificar de usuário é adm S/N
    if (admin) {
        return next();
    }
    
    return response.status(401).json({
        error: "Não Autorizado",
    });
}



