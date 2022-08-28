"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const dotenv_1 = require("dotenv");
// env variables
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
// app
const app = (0, express_1.default)();
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
// middleware
app.use(express_1.default.json());
// routes
app.get("/", (req, res) => {
    res.send("jobs api");
});
// error middleware
app.use(error_handler_1.default);
app.use(not_found_1.default);
// port
const port = process.env.PORT || 3000;
// start
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // connectDB
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    }
    catch (error) {
        console.error(error);
    }
});
start();
