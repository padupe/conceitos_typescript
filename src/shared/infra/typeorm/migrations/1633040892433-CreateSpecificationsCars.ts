import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateSpecificationsCars1633040892433 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'specifications_cars',
                columns: [
                    {
                        name: 'car_id',
                        type: 'uuid',
                    },
                    {
                        name: 'specification_id',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ]
            })
        );

        // Outra maneira de se cadastrar uma Foreign Key (Chave Estrangeira)
        await queryRunner.createForeignKey(
            'specifications_cars',
            new TableForeignKey({
                name: 'FKSpecificationCar',
                referencedTableName: 'specifications',
                referencedColumnNames: ['id'],
                columnNames: ['specification_id'],
                // pode ser 'cascate', 'estrict'
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        );

        // Outra maneira de se cadastrar uma Foreign Key (Chave Estrangeira)
        await queryRunner.createForeignKey(
            'specifications_cars',
            new TableForeignKey({
                name: 'FKCarSpecification',
                referencedTableName: 'cars',
                referencedColumnNames: ['id'],
                columnNames: ['car_id'],
                // pode ser 'cascate', 'estrict'
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        );
    };

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey(
            'specifications_cars',
            'FKSpecificationCar'
        );

        await queryRunner.dropForeignKey(
            'specifications_cars',
            'FKCarSpecification'
        );

        await queryRunner.dropTable('specifications_cars');
    };

}
