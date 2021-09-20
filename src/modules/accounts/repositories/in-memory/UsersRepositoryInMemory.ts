import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";



class UsersRepositoryInMemory implements IUsersRepository {

    users: User[] = [];

    async create({name, email, password, driver_license}: ICreateUserDTO): Promise<void> {
        
        const newUser = new User();
        
        Object.assign(newUser, {
            name,
            email,
            password,
            driver_license,
        });

        this.users.push(newUser);
    };

    async findByEmail(email: string): Promise<User> {
        return this.users.find((findUser) => findUser.email === email);
    };

    async findById(id: string): Promise<User> {
        return this.users.find((findUser) => findUser.id === id);
    };

};

export { UsersRepositoryInMemory };