"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConnectionDB = void 0;

var _typeorm = require("typeorm");

// Mudança no Código para setar um Usuário Admin
const createConnectionDB = (0, _typeorm.getConnectionOptions)().then(options => {
  let hostDB = 'localhost';

  if (process.env.NODE_ENV === 'test') {
    hostDB = 'rentx';
  }

  const newOptions = options;
  newOptions.host = hostDB; // A opção abaixo não estava funcionando corretamente com Container/Docker
  // Alterei para 'localhost' para apenas o DB rodar em Docker
  // newOptions.host = 'localhost';

  (0, _typeorm.createConnection)({ ...options
  });
}); // export default async(host = 'localhost'): Promise<Connection> => {
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

exports.createConnectionDB = createConnectionDB;