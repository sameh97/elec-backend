"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.AuthenticationError = AuthenticationError;
//# sourceMappingURL=authentication-error.js.map