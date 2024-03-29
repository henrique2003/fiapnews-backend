"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: String,
    password: {
        type: String,
        select: false
    }
});
exports.default = mongoose_1.model('User', UserSchema);
