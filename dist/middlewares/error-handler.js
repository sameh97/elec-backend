"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const not_found_error_1 = require("../exeptions/not-found-error");
const input_error_1 = require("../exeptions/input-error");
const already_exist_error_1 = require("../exeptions/already-exist-error");
const authentication_error_1 = require("../exeptions/authentication-error");
const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof not_found_error_1.NotFoundErr) {
        res.status(404).send(err.message);
    }
    else if (err instanceof input_error_1.InputError || err instanceof already_exist_error_1.AlreadyExistError) {
        res.status(400).send(err.message);
    }
    else if (err instanceof authentication_error_1.AuthenticationError) {
        res.status(403).send(err.message);
    }
    else {
        res.status(500).send(err.message);
    }
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=error-handler.js.map