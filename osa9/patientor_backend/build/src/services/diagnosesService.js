"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const diagnoses_json_1 = __importDefault(require("../../data/diagnoses.json"));
const diagnosis = diagnoses_json_1.default;
const data = () => {
    return diagnosis;
};
exports.data = data;
