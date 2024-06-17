"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateUserOwnership(req, res, next) {
    var _a, _b, _c;
    const userId = (_a = req.body.userId) !== null && _a !== void 0 ? _a : req.params.userId;
    const id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    const role = (_c = req.user) === null || _c === void 0 ? void 0 : _c.role;
    if (Number(userId) !== id && role !== 'ADMIN') {
        return res.status(401).json({ message: 'Acesso ao curso não autorizado', teste: userId !== null && userId !== void 0 ? userId : "ausente", id });
    }
    next();
}
exports.default = validateUserOwnership;
