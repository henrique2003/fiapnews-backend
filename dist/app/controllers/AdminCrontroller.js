"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = require("jsonwebtoken");
const models_1 = require("../models");
dotenv_1.config();
class AdminController {
    async store(req, res) {
        try {
            const { name, password } = req.body;
            if (!name || !password) {
                return res.status(400).json(new Error('Campo em branco'));
            }
            if (await models_1.Admin.findOne({ name })) {
                return res.status(400).json(new Error('Nome de usuário em uso'));
            }
            req.body.password = await bcrypt_1.hash(password, 10);
            const admin = await models_1.Admin.create(req.body);
            return res.status(200).json(admin);
        }
        catch (error) {
            return res.status(500).json(new Error('Server Error'));
        }
    }
    async login(req, res) {
        try {
            const { name, password } = req.body;
            if (!name || !password) {
                return res.status(400).json(new Error('Campo em branco'));
            }
            const user = await models_1.Admin.findOne({ name }).select('+password');
            if (!user) {
                return res.status(400).json(new Error('Usuário não encontrado'));
            }
            if (!await bcrypt_1.compare(password, user.password)) {
                return res.status(400).json(new Error('Senha inválida'));
            }
            const token = jsonwebtoken_1.sign(user.id, process.env.SECRET, { expiresIn: 8640 });
            return res.status(200).json({ user, token });
        }
        catch (error) {
            return res.status(500).json(new Error('Server Error'));
        }
    }
    async load(req, res) {
        try {
            const id = req.userId;
            const admin = await models_1.Admin.findById(id);
            return res.status(200).json(admin);
        }
        catch (error) {
            return res.status(500).json(new Error('Server Error'));
        }
    }
}
exports.default = new AdminController();
