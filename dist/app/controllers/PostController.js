"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class PostController {
    async index(req, res) {
        try {
            const posts = await models_1.Post.find({});
            return res.status(200).json(posts);
        }
        catch (error) {
            return res.status(500).json(new Error('Server Error'));
        }
    }
    async store(req, res) {
        try {
            const { title, message } = req.body;
            if (!title || !message) {
                return res.status(400).json(new Error('Campo em branco'));
            }
            const post = await models_1.Post.create(req.body);
            return res.status(200).json(post);
        }
        catch (error) {
            return res.status(500).json(new Error('Server Error'));
        }
    }
    async destroy(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json(new Error('Id requerido'));
            }
            await models_1.Post.findByIdAndDelete(id);
            return res.status(204).json();
        }
        catch (error) {
            return res.status(500).json(new Error('Server Error'));
        }
    }
}
exports.default = new PostController();
