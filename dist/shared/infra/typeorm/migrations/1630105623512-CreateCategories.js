"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategories1630105623512 = void 0;

var _typeorm = require("typeorm");

class CreateCategories1630105623512 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'categories',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'description',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  } // Caso a migration resulte em erro, o método down é chamado


  async down(queryRunner) {
    await queryRunner.dropTable('categories');
  }

}

exports.CreateCategories1630105623512 = CreateCategories1630105623512;