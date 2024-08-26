"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwt_1 = require("../utils/jwt");
function authMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return; // Adicione um retorno após enviar a resposta
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
        next(); // Passe o controle para o próximo middleware
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
        return; // Adicione um retorno após enviar a resposta
    }
}
