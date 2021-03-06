import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
    host: string;
}

// Mudança no Código para setar um Usuário Admin
const createConnectionDB = getConnectionOptions().then(options => {

    let hostDB = 'localhost'

    if(process.env.NODE_ENV === 'test') {
        hostDB = 'rentx'
    }

    const newOptions = options as IOptions;
    newOptions.host = hostDB;
    // A opção abaixo não estava funcionando corretamente com Container/Docker
    // Alterei para 'localhost' para apenas o DB rodar em Docker
    // newOptions.host = 'localhost';
    createConnection({
        ...options,
    });
});

// export { createConnectionDB };

// Durate o Chapter VI - Alteramos o código abaixo para realizar o Deploy
// export default async(): Promise<Connection> => {
//     const defaultOptions = await getConnectionOptions();

//     return createConnection(
//         Object.assign(defaultOptions, {
//             database:
//                 process.env.NODE_ENV === 'test'
//                     ? 'rentx_test'
//                     : defaultOptions.database    
//         })
//     )
// }