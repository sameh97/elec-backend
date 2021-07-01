"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundErr = void 0;
class NotFoundErr extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.NotFoundErr = NotFoundErr;
//# sourceMappingURL=not-found-error.js.map