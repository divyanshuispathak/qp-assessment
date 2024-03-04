"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connect = () => {
    mongoose_1.default.connect(process.env.DATABASE_URL)
        .then(() => { console.log("DB connected successfully"); })
        .catch((err) => {
        console.log("DB CONNECTION ISSUES");
        console.error(err);
        process.exit(1);
    });
};
exports.connect = connect;
