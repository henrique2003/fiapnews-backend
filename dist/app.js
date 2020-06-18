"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = require("dotenv");
const routes_1 = __importDefault(require("./app/routes"));
dotenv_1.config();
class App {
    constructor() {
        this.express = express_1.default();
        this.connectDb();
        this.middlewares();
        this.routes();
    }
    async connectDb() {
        var _a;
        try {
            await mongoose_1.connect((_a = process.env.MONGO_URL) !== null && _a !== void 0 ? _a : 'mongodb://localhost:27017/fiapnews', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('MongoDb connect');
        }
        catch (error) {
            console.log('Error to connect MongoDb');
            process.exit(1);
        }
    }
    middlewares() {
        this.express.use(express_1.default.json());
        this.express.use(cors_1.default());
        this.express.use(helmet_1.default());
    }
    routes() {
        this.express.use(routes_1.default);
    }
}
exports.default = new App().express;
