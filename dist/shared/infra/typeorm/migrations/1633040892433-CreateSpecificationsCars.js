"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationsCars1633040892433 = void 0;

var _typeorm = require("typeorm");

class CreateSpecificationsCars1633040892433 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'specifications_cars',
      columns: [{
        name: 'car_id',
        type: 'uuid'
      }, {
        name: 'specification_id',
        type: 'uuid'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    })); // Outra maneira de se cadastrar uma Foreign Key (Chave Estrangeira)

    await queryRunner.createForeignKey('specifications_cars', new _typeorm.TableForeignKey({
      name: 'FKSpecificationCar',
      referencedTableName: 'specifications',
      referencedColumnNames: ['id'],
      columnNames: ['specification_id'],
      // pode ser 'cascate', 'estrict'
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    })); // Outra maneira de se cadastrar uma Foreign Key (Chave Estrangeira)

    await queryRunner.createForeignKey('specifications_cars', new _typeorm.TableForeignKey({
      name: 'FKCarSpecification',
      referencedTableName: 'cars',
      referencedColumnNames: ['id'],
      columnNames: ['car_id'],
      // pode ser 'cascate', 'estrict'
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('specifications_cars', 'FKSpecificationCar');
    await queryRunner.dropForeignKey('specifications_cars', 'FKCarSpecification');
    await queryRunner.dropTable('specifications_cars');
  }

}

exports.CreateSpecificationsCars1633040892433 = CreateSpecificationsCars1633040892433;