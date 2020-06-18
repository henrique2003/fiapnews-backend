"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json(new Error('Acesso negado'));
    }
    try {
        const decode = jsonwebtoken_1.verify(authHeader, process.env.SECRET);
        req.userId = decode.id;
        next();
    }
    catch (error) {
        return res.status(401).json(new Error('Acesso negado'));
    }
};
exports.default = auth;
