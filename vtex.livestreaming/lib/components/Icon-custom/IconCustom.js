"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Icon_1 = __importDefault(require("./Icon"));
const IconCustom = ({ id, size, viewBox }) => {
    return react_1.default.createElement(Icon_1.default, { id: id, width: size, height: size, viewBox: viewBox });
};
exports.default = IconCustom;
