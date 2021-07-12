"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosesService_1 = require("../services/diagnosesService");
const diagnoseRouter = express_1.default.Router();
diagnoseRouter.get('/', (_req, res) => {
    res.send(diagnosesService_1.data());
});
exports.default = diagnoseRouter;
