"use strict";

var _app = require("@shared/infra/http/app");

var _supertest = _interopRequireDefault(require("supertest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Código comentado pois não funcionou devido apenas o DataBase estar "Dockeirizado"
// import { createConnectionDB } from '@shared/infra/typeorm';
// import { Connection } from 'typeorm';
// import { hash } from 'bcrypt';
// import { v4 as uuid } from 'uuid';
// let connection: Connection;
describe('Create Category Controller', () => {
  beforeAll(async () => {// connection = await createConnectionDB();
    // await connection.runMigrations();
    // const id = uuid();
    // const password = await hash('admin', 8);
    //     await connection.query(
    //         `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    //         values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXX')`
    //     );
  }); // afterAll(async () => {
  // await connection.dropDatabase();
  // await connection.close();
  // })

  it('Should be able to create a new category', async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    });
    const {
      refresh_token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post('/categories').send({
      name: "Category Integration Test",
      description: "Description Integration Test"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    expect(response.status).toBe(201);
  });
  it('Should not be able to create a new category with name exists', async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    });
    const {
      refresh_token
    } = responseToken.body;
    console.log(responseToken.body);
    const response = await (0, _supertest.default)(_app.app).post('/categories').send({
      name: "Category Integration Test",
      description: "Description Integration Test"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    expect(response.status).toBe(400);
  });
});