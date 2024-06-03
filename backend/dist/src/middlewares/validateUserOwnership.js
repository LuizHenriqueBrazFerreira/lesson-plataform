"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateUserOwnership(req, res, next) {
    var _a;
    const { userId } = req.params;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (Number(userId) !== id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}
exports.default = validateUserOwnership;
