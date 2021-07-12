"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const isString = (entry) => {
    return typeof entry === 'string' || entry instanceof String;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('incorrect or missing name');
    }
    return name;
};
const parseDateOfBirth = (entry) => {
    if (!entry || !isString(entry)) {
        throw new Error('dateOfBirth is incorrect or doenst exist');
    }
    return entry;
};
const parseSsn = (entry) => {
    if (!entry || !isString(entry)) {
        throw new Error('ssn is incorrect or doenst exist');
    }
    return entry;
};
const parseOccupation = (entry) => {
    if (!entry || !isString(entry)) {
        throw new Error('occupation is incorrect or doenst exist');
    }
    return entry;
};
const parseGender = (entry) => {
    if (!entry || !isGender(entry)) {
        throw new Error('gender is incorrect or doenst exist');
    }
    return entry;
};
const toNewPatientEntry = ({ name, dateOfBirth, ssn, occupation, gender }) => {
    const newPatient = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        occupation: parseOccupation(occupation),
        gender: parseGender(gender),
    };
    return newPatient;
};
exports.toNewPatientEntry = toNewPatientEntry;
