"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundErr = void 0;
class UserNotFoundErr extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.UserNotFoundErr = UserNotFoundErr;
//# sourceMappingURL=user-not-found-error.js.map