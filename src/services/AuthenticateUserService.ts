import { getCustomRepository } from 'typeorm';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UsersRepositories } from '../repositories/UsersRepositories';


interface IAuthenticateResquest {
    email: string;
    password: string;
}

class AuthenticateUserService {


    async execute({email, password}: IAuthenticateResquest) {
        const usersRepositories = getCustomRepository(UsersRepositories)


        // Verificar se o email existe
        const user = await usersRepositories.findOne({
            email,
        });
        
        if (!user) {
            throw new Error("Email/Senha está errada! (email)")
        }

        // Verificar se a senha está correta

        const passwordMatch =  await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email/Senha está errada! (senha)")
        }

        // Gerar token

        const token = sign(
            {
            email: user.email
            },
        "b6b06fe1185c8fb242590867b5178698", 
            {
            subject: user.id,
            expiresIn: "1d",
            }
        );
        return token;
    }
}

export { AuthenticateUserService }