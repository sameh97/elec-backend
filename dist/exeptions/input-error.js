"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputError = void 0;
class InputError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.InputError = InputError;
//# sourceMappingURL=input-error.js.map