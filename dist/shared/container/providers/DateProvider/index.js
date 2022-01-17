"use strict";

var _tsyringe = require("tsyringe");

var _DayJSDateProvider = require("./implementations/DayJSDateProvider");

_tsyringe.container.registerSingleton("DayJSDateProvider", _DayJSDateProvider.DayJSDateProvider);