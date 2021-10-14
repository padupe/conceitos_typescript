import { app } from '@shared/infra/http/app';
import request from 'supertest';

// Código comentado pois não funcionou devido apenas o DataBase estar "Dockeirizado"

// import { createConnectionDB } from '@shared/infra/typeorm';
// import { Connection } from 'typeorm';
// import { hash } from 'bcrypt';
// import { v4 as uuid } from 'uuid';

// let connection: Connection;

describe('Create Category Controller', () => {

    beforeAll(async () =>{

        // connection = await createConnectionDB();
        // await connection.runMigrations();

        // const id = uuid();
        // const password = await hash('admin', 8);

        //     await connection.query(
        //         `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        //         values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXX')`
        //     );

    })

    // afterAll(async () => {
        // await connection.dropDatabase();
        // await connection.close();
    // })
    
    it('Should be able to create a new category', async () => {

        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@rentx.com.br',
            password: 'admin'
        });

        console.log(responseToken.body)

        const response = await request(app).post('/categories').send({
            name: "Category Integration Test",
            description: "Description Integration Test"
        });

        expect(response.status).toBe(201);
    })
})