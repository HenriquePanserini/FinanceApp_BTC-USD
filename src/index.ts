import {config} from 'dotenv'
import axios from 'axios'
import Period from './enums/period'
import candles from './models/Candles'
import { createMessageChannel } from './messages/messageChannel'

const readMarketPrice = async (): Promise<number> => {
    config()
    const result = await axios.get(process.env.PRICES_API || 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
    const data = result.data;
    const price = data.bitcoin.usd;
    return price; 
}

const generateCandles = async () => {
    
    try {
        
        const messageChannel = await createMessageChannel()
        
        if(messageChannel){
            do{
                
                const loopTimes = Period.ONE_MINUTES / Period.TEN_SECONDS;
                const candle = new candles('BTC', new Date());

                console.log("---------------------------------------------")
                console.log("Generating new candles\n");

                for(let i = 0; i < loopTimes; i++){
                    const price = await readMarketPrice();
                    candle.addValue(price);
                    console.log(`Market price #${i + 1} of ${loopTimes}`);
                    await new Promise(r => setTimeout(r, Period.TEN_SECONDS));
                }

                candle.closeCandle()
                console.log('Candle close')
                const candleObj = candle.toSimpleObject()
                console.log(candleObj)
                const candleJson = JSON.stringify(candleObj)
                messageChannel.sendToQueue((process.env.QUEUE_NAME || 'candles'), Buffer.from(candleJson))
                console.log('Candle sent to queue')
            }while(true)
        }

    } catch (error) {

        console.log("Erro ao carregar o grafico: " + error);
    }   
    
}

generateCandles();
console.log()