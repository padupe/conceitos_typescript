import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
    host: string;
}

// Mudança no Código para setar um Usuário Admin
getConnectionOptions().then(options => {
    const newOptions = options as IOptions;
    newOptions.host = 'localhost';
    // A opção abaixo não estava funcionando corretamente com Container/Docker
    // Alterei para 'localhost' para apenas o DB rodar em Docker
    // newOptions.host = 'localhost';
    createConnection({
        ...options,
    });
});

// export default async(host = 'localhost'): Promise<Connection> => {
//     const defaultOptions = await getConnectionOptions();

//     return createConnection(
//         Object.assign(defaultOptions, {
//             host,
//             database:
//                 process.env.NODE_ENV === 'test'
//                     ? 'rentx_test'
//                     : defaultOptions.database    
//         })
//     )
// }