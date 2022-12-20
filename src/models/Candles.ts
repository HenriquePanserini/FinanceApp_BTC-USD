import { cachedDataVersionTag } from "v8"
import candlesColors from "../enums/candlesColor"

export default class Candles{
    low: number
    high: number
    open: number
    close: number
    color: candlesColors
    initialDateTime: Date
    finalDateTime: Date
    values: number[]
    currency: string

    constructor(currency: string, initialDateTime: Date){
        this.currency = currency;
        this.initialDateTime = initialDateTime;
        this.finalDateTime = new Date();
        this.low = Infinity;
        this.high = 0;
        this.close = 0;
        this.open = 0;
        this.values = [];
        this.color = candlesColors.UNDETERMINED;

    }

    addValue(value: number){
        this.values.push(value)

        if(this.values.length = 1){
            this.open = value
        }

        if(this.low > value){
            this.low = value
        }

        if(this.high < value){
            this.high = value
        }

    }

    closeCandle(){
        if(this.values.length > 0){
            this.close = this.values[this.values.length - 1]
            this.finalDateTime = new Date()

            if(this.open > this.close){
                this.color = candlesColors.RED;
            }else if(this.close > this.open){
                this.color = candlesColors.GREEN;
            }
        }
    }

    toSimpleObject(){
        const{ values, ...obj } = this;
        return obj;
    }
}

