import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserResquest {
    name: string;
    email: string;
    admin?: boolean
}

class CreateUserService {
    
    async execute({name, email, admin} : IUserResquest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        if(!email) {
            throw new Error("Email incorreto");
        }

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if (userAlreadyExists) {
            throw new Error("Usuário já existe!");
        }

        const user = usersRepository.create({
            name,
            email,
            admin
        })

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService };

