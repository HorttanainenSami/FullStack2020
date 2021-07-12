"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPatient = exports.patientsData = void 0;
const patients_1 = require("../../data/patients");
const uuid_1 = require("uuid");
const patientsData = () => {
    return patients_1.patients;
};
exports.patientsData = patientsData;
const addPatient = (entry) => {
    const id = uuid_1.v1();
    const newPatient = Object.assign({ id }, entry);
    patients_1.patients.push(newPatient);
    return newPatient;
};
exports.addPatient = addPatient;
