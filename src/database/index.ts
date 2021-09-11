import { createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
    host: string;
}

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
