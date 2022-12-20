import { config } from 'dotenv'
import { Channel, connect } from 'amqplib'

export const createMessageChannel = async (): Promise<Channel> => {
    config();

    try {
        const connection = await connect(process.env.AMQP_SERVER || 'amqp://henrique:gtcanime@localhost:5672')
        const channel = await connection.createChannel();
        await channel.assertQueue(process.env.QUEUE_NAME || 'candles')
        console.log('Connected top RabbitMQ')
        return channel
    } catch (error) {
        console.log('Error while trying to connect RabbitMQ');
        console.log(error);
        return Promise.reject('_currentInstruction is fale');
    }
}