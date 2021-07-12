"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosesRouter_1 = __importDefault(require("./routes/diagnosesRouter"));
const patientsRouter_1 = __importDefault(require("./routes/patientsRouter"));
const cors = require('cors');
const app = express_1.default();
app.use(cors());
app.use(express_1.default.json());
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.use('/api/diagnoses', diagnosesRouter_1.default);
app.use('/api/patients', patientsRouter_1.default);
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server is running in port ${PORT}`);
});
