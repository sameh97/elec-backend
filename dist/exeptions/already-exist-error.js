"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyExistError = void 0;
class AlreadyExistError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.AlreadyExistError = AlreadyExistError;
//# sourceMappingURL=already-exist-error.js.map