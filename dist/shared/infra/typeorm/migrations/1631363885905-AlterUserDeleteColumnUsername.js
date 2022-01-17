"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserDeleteColumnUsername1631363885905 = void 0;

var _typeorm = require("typeorm");

class AlterUserDeleteColumnUsername1631363885905 {
  async up(queryRunner) {
    await queryRunner.dropColumn("users", "username");
  }

  async down(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "username",
      type: "varchar"
    }));
  }

}

exports.AlterUserDeleteColumnUsername1631363885905 = AlterUserDeleteColumnUsername1631363885905;