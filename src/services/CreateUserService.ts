import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs";

interface IUserResquest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {
    
    async execute({name, email, admin = false, password} : IUserResquest) {
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

        const passwordHash = await hash(password, 8)


        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService };

