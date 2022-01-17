"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentals1633559732972 = void 0;

var _typeorm = require("typeorm");

class CreateRentals1633559732972 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'rentals',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'car_id',
        type: 'uuid'
      }, {
        name: 'user_id',
        type: 'uuid'
      }, {
        name: 'start_date',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'end_date',
        type: 'timestamp',
        isNullable: true
      }, {
        name: 'expected_return_date',
        type: 'timestamp'
      }, {
        name: 'total',
        type: 'numeric',
        isNullable: true
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'FKCarRental',
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        columnNames: ['car_id'],
        // pode ser 'cascate', 'estrict'
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }, {
        name: 'FKUserRental',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        // pode ser 'cascate', 'estrict'
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('rentals');
  }

}

exports.CreateRentals1633559732972 = CreateRentals1633559732972;
;