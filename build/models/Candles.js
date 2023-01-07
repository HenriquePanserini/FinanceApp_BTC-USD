"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var candlesColor_1 = require("../enums/candlesColor");
var Candles = /** @class */ (function () {
    function Candles(currency, initialDateTime) {
        this.currency = currency;
        this.initialDateTime = initialDateTime;
        this.finalDateTime = new Date();
        this.low = Infinity;
        this.high = 0;
        this.close = 0;
        this.open = 0;
        this.values = [];
        this.color = candlesColor_1.default.UNDETERMINED;
    }
    Candles.prototype.addValue = function (value) {
        this.values.push(value);
        if (this.values.length = 1) {
            this.open = value;
        }
        if (this.low > value) {
            this.low = value;
        }
        if (this.high < value) {
            this.high = value;
        }
    };
    Candles.prototype.closeCandle = function () {
        if (this.values.length > 0) {
            this.close = this.values[this.values.length - 1];
            this.finalDateTime = new Date();
            if (this.open > this.close) {
                this.color = candlesColor_1.default.RED;
            }
            else if (this.close > this.open) {
                this.color = candlesColor_1.default.GREEN;
            }
        }
    };
    Candles.prototype.toSimpleObject = function () {
        var _a = this, values = _a.values, obj = __rest(_a, ["values"]);
        return obj;
    };
    return Candles;
}());
exports.default = Candles;
//# sourceMappingURL=Candles.js.map