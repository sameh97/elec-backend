"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appResponseHandler = void 0;
const error_handler_1 = require("./error-handler");
const appResponseHandler = (data, req, res, next) => {
    if (data instanceof Error) {
        error_handler_1.globalErrorHandler(data, req, res, next);
    }
    else {
        const statusCode = res.statusCode ? Number(res.statusCode) : 200;
        res.status(statusCode).json(data);
    }
};
exports.appResponseHandler = appResponseHandler;
//# sourceMappingURL=app-response-handler.js.map