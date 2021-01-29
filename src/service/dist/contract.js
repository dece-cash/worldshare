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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var config = require("./config");
var service_1 = require("./service");
var utils = require("../common/utils");
var utils_1 = require("../common/utils");
var serojs = require("serojs");
var seropp = require("sero-pp");
var Contract = /** @class */ (function () {
    function Contract() {
        this.contract = serojs.callContract(config.abi, config.address);
    }
    Contract.prototype.details = function (from) {
        return __awaiter(this, void 0, Promise, function () {
            var rest, details;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.call("details", [], from)];
                    case 1:
                        rest = _a.sent();
                        console.log("rest>>> ", rest);
                        details = {
                            ID: parseInt(rest[0][0]),
                            idLeft: rest[0][1],
                            idRight: rest[0][2],
                            grand: utils_1.fromValue(rest[0][3], 18),
                            small: utils_1.fromValue(rest[0][4], 18),
                            boosterLevel: parseInt(rest[0][5]),
                            player: {
                                refferId: parseInt(rest[0][6][0]),
                                value: utils.fromValue(rest[0][6][1], 18),
                                returnValue: utils.fromValue(rest[0][6][2], 18),
                                canDrawupValue: utils.fromValue(rest[0][6][3], 18),
                                level: parseInt(rest[0][6][4]),
                                recommendProfit: utils.fromValue(rest[0][6][5], 18),
                                boosterProfit: utils.fromValue(rest[0][6][6], 18),
                                roolupProfit: utils.fromValue(rest[0][6][7], 18),
                                suportProfit: utils.fromValue(rest[0][6][8], 18),
                                achievement: utils.fromValue(rest[0][6][9], 18),
                                otherAchievement: utils.fromValue(rest[0][6][10], 18),
                                avatarValue: utils.fromValue(rest[0][6][11], 18),
                                overflowValue: utils.fromValue(rest[0][6][12], 18)
                            },
                            reffer: rest[0][7]
                        };
                        console.log("details>>>>", details);
                        return [2 /*return*/, details];
                }
            });
        });
    };
    Contract.prototype.register = function (referCode, account, cy, value) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.execute("register", [referCode ? referCode : ""], account, cy, utils.toHex(value))];
            });
        });
    };
    Contract.prototype.withdraw = function (account) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.execute("withdraw", [], account, "DECE", "0x0")];
            });
        });
    };
    Contract.prototype.call = function (method, args, from) {
        return __awaiter(this, void 0, Promise, function () {
            var packData, contract;
            var _this = this;
            return __generator(this, function (_a) {
                packData = this.contract.packData(method, args, true);
                contract = this.contract;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var params = {
                            to: _this.contract.address
                        };
                        params.from = from;
                        params.data = packData;
                        service_1["default"].rpc("dece_call", [params, "latest"]).then(function (data) {
                            if (data != "0x") {
                                var rest = contract.unPackDataEx(method, data);
                                resolve(rest);
                            }
                            else {
                            }
                        })["catch"](function (err) {
                            reject(err);
                        });
                    })];
            });
        });
    };
    Contract.prototype.execute = function (method, args, account, cy, value) {
        return __awaiter(this, void 0, Promise, function () {
            var packData;
            var _this = this;
            return __generator(this, function (_a) {
                packData = this.contract.packData(method, args, true);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var params = {
                            to: _this.contract.address
                        };
                        params.from = account.mainPKr;
                        params.data = packData;
                        if (cy) {
                            params.cy = cy;
                        }
                        if (value) {
                            params.value = value;
                        }
                        service_1["default"].rpc("dece_estimateGas", [params]).then(function (data) {
                            params.gas = data;
                            params.from = account.pk;
                            seropp.executeContract(params, function (hash, err) {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    resolve(hash);
                                }
                            });
                        })["catch"](function (e) {
                            reject(e);
                        });
                    })];
            });
        });
    };
    return Contract;
}());
var contract = new Contract();
exports["default"] = contract;
