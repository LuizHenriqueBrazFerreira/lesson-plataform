"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateUserOwnership(req, res, next) {
    var _a, _b;
    const { userId } = req.params;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    if (Number(userId) !== id && role !== 'ADMIN') {
        return res.status(401).json({ message: 'Acesso ao curso não autorizado' });
    }
    next();
}
exports.default = validateUserOwnership;
