"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = require("../services/patientsService");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.patientsData());
});
router.post('/', (req, res) => {
    try {
        console.log('asd');
        const newEntry = utils_1.toNewPatientEntry(req.body);
        const newPatient = patientsService_1.addPatient(newEntry);
        res.json(newPatient);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;
