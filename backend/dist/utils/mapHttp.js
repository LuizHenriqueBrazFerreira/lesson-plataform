"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapStatusHttp(status) {
    var _a;
    const httpStatus = {
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        BAD_REQUEST: 400,
        INVALID_DATA: 409
    };
    return (_a = httpStatus[status]) !== null && _a !== void 0 ? _a : 500;
}
exports.default = mapStatusHttp;
