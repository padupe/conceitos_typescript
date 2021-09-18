import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
    avatar_file: string;
};

@injectable()
class UpdateUserAvatarUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        // Verifica se já existe um Avatar inserido para o usuário
        if(user.avatar) {
            // Realiza a Busca do Avatar no Banco de Dados
            // Há a necessidade de se indicar o diretório que o arquivo deve ser buscado para que ele seja apagado
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        };

        // Substituição do Avatar (caso já exista), ou inserção no caso de Novo
        user.avatar = avatar_file;

        await this.usersRepository.create(user);
    };

};

export { UpdateUserAvatarUseCase };