"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const auth_1 = __importDefault(require("./middlewares/auth"));
const routes = express_1.Router();
// Admin
routes.post('/admin', auth_1.default, controllers_1.AdminController.store);
routes.get('/load', auth_1.default, controllers_1.AdminController.load);
routes.post('/login', controllers_1.AdminController.login);
// Post
routes.get('/post', auth_1.default, controllers_1.PostController.index);
routes.post('/post', controllers_1.PostController.store);
routes.delete('/post', controllers_1.PostController.destroy);
exports.default = routes;
