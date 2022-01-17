"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

require("../typeorm");

require("@shared/container");

var _routes = require("@shared/infra/http/routes");

var _swagger = _interopRequireDefault(require("../../../swagger.json"));

var _AppError = require("@shared/errors/AppError");

var _upload = _interopRequireDefault(require("@config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Não esquecer de realizar o import do Container [TSyringe]
const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.json());
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default)); // Utilizado para verificar o "endereço" que os arquivos estãos endo salvos LOCALMENTE

app.use('/avatar', _express.default.static(`${_upload.default.tmpFolder}/avatar`));
app.use('/cars', _express.default.static(`${_upload.default.tmpFolder}/cars`));
app.use(_routes.router);
app.use((err, request, response, next) => {
  if (err instanceof _AppError.AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  ;
  console.log(err);
  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}.`
  });
});