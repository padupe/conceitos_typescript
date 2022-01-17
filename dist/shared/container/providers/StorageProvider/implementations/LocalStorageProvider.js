"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalStorageProvider = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = require("path");

var _upload = _interopRequireDefault(require("@config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LocalStorageProvider {
  async save(file, folder) {
    _fs.default.promises.rename((0, _path.resolve)(_upload.default.tmpFolder, file), (0, _path.resolve)(`${_upload.default.tmpFolder}/${folder}`, file));

    return file;
  }

  async delete(file, folder) {
    const fileName = (0, _path.resolve)(`${_upload.default.tmpFolder}/${folder}`, file);

    try {
      await _fs.default.promises.stat(fileName);
    } catch {
      return;
    }

    ;
    await _fs.default.promises.unlink(fileName);
  }

}

exports.LocalStorageProvider = LocalStorageProvider;
;