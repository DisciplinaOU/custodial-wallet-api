"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.disciplinaContract = void 0;
var ethers_1 = require("ethers");
var disciplina_abi_json_1 = __importDefault(require("./disciplina_abi.json"));
var env_1 = require("../../configs/env");
var constants_1 = require("../../configs/constants");
var contractInterface = new ethers_1.utils.Interface(disciplina_abi_json_1["default"]);
exports.disciplinaContract = new ethers_1.Contract(env_1.disciplinaContractAddr, contractInterface, constants_1.provider);
