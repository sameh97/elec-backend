"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUtils = void 0;
class AppUtils {
    static hasValue(obj) {
        if (typeof obj === "undefined" || obj === null) {
            return false;
        }
        return true;
    }
    static getFullException(err) {
        if (!err)
            return "";
        return `${err.message}, stack: ${err.stack}`;
    }
    static isInteger(obj) {
        if (!AppUtils.hasValue(obj)) {
            return false;
        }
        if (!isNaN(obj) && Number.isInteger(obj)) {
            return true;
        }
        return false;
    }
}
exports.AppUtils = AppUtils;
//# sourceMappingURL=app-utils.js.map