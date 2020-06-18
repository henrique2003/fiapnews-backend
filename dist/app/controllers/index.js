"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = exports.AdminController = void 0;
const AdminCrontroller_1 = __importDefault(require("./AdminCrontroller"));
exports.AdminController = AdminCrontroller_1.default;
const PostController_1 = __importDefault(require("./PostController"));
exports.PostController = PostController_1.default;
