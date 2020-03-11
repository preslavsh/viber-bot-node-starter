import { Server } from 'http';
import {
    CHAT_BOT_AVATAR,
    CHAT_BOT_NAME,
    MONGODB_URI_LOCAL,
    NGROK_URL,
    VIBER_TOKEN_LOCAL
} from "../common/common.contants";
import mdb from '../mongodb';
import { IMDB } from '../mongodb';
import * as mongoose from "mongoose";
import { UserCache } from "../index";
import * as countriesTimezones from "countries-and-timezones";
import { IViberBot } from "../viber.interfaces";
import { LoggerFacade } from "../logger";

const port = 3000;
const TOKEN = VIBER_TOKEN_LOCAL;
const webhookUrl = process.env.STRETCHBIT_EN_WEBHOOK || NGROK_URL;
const MONGODB_URI = process.env.MONGODB_URI || MONGODB_URI_LOCAL;

/**
 * Viber objects
 */
export const Viber  = require('viber-bot');
const ViberBot  = Viber.Bot;
export const bot = new ViberBot({
    authToken: TOKEN,
    name: CHAT_BOT_NAME,
    avatar: CHAT_BOT_AVATAR,
    logger: {
         debug: console.log,
         error: console.error,
         info: console.log,
         warn: console.log,
    }
});

let app = bot.middleware();
let server: Server;

bot.onError((error: any)=>{
    console.error(error);
});

let connection: typeof mongoose;

const calculateUserTime = (offset: string,): Date => {
    const serverDate = new Date();
    const utcTime = serverDate.getTime() + (serverDate.getTimezoneOffset() * 60000);
    return new Date(utcTime + (3600000 * parseInt(offset)));
};

export const shouldSendMessages = (currentUser: any, shouldBroadcastValidator: (hour: number) => boolean): boolean => {
    const timezones = countriesTimezones.getTimezonesForCountry(currentUser.country);
    const firstTimezone = timezones[0];
    const utcOffset = firstTimezone.utcOffsetStr;
    const currentUserHour = calculateUserTime(utcOffset).getHours();
    const result = shouldBroadcastValidator(currentUserHour);
    console.log('=================shouldSendMessages=============');
    console.log('utcOffset', utcOffset);
    console.log('country', currentUser.country);
    console.log('firstTimezone', firstTimezone);
    console.log('currentUserHour', currentUserHour);
    console.log('timezones', timezones);
    console.log('result', result);
    console.log('================================================');
    return result;
};


const getBroadcastMessages = (currentUser: UserCache): any[] => {
    return [];
};

const broadcastToSingleUser = async (bot: IViberBot, currentUser: UserCache, shouldBroadcastValidator: (hour: number) => boolean) => {
    const currentUserId = currentUser.viberId;
    if(!shouldSendMessages(currentUser, shouldBroadcastValidator)) {
        return;
    }
    const messages = getBroadcastMessages(currentUser);
    try {
        console.log(`currentUser: ${currentUserId}`);
        await bot.sendMessage( { id: currentUserId } , messages);
        console.log(`broadcastToSingleUser Message was sent to user with id: ${ currentUserId }`);
    } catch (error) {
        console.error(`broadcastToSingleUser error: ${JSON.stringify(error)}: currentUserId: ${currentUserId}`);
    }
};

const shouldBroadcastValidator = (): boolean =>  {
    return true;
};

const broadcastMessages = async (bot: IViberBot, mdb: IMDB, time: number, logger: LoggerFacade)=> {
    const mongooseUsers = await mdb.userService.findAllSubscribed();
    const users = mongooseUsers.map((user)=>user.toJSON());
    console.log('==============================================================');
    console.log(`Running job on every ${time} with users length: ${users.length}`);
    console.log('==============================================================');
    for(let index = 0; index < users.length; index++) {
        await broadcastToSingleUser(bot, users[index], shouldBroadcastValidator);
    }
};

const stopServer = ()=>{
    server.close(()=>console.log('Server stop'));
};

const connect = () => {
    return mongoose.connect(MONGODB_URI,  { useNewUrlParser: true });
};

const listen = (c: typeof mongoose): void => {
    connection = c;
    server = app.listen(port, ()=>{
        console.log("Started");
        bot.setWebhook(webhookUrl).then(async (result: any) => {
                console.log('Webhook set', result);
                const args: string[] = process.argv.slice(1);
                const time = parseInt(args[1], 10);
                await broadcastMessages(bot, mdb, time, { track: console.log } as any);
                stopServer();
                connection.disconnect();
            })
            .catch((error: any) => {
                console.log('Webhook crashed, probably because we have stop the server', error);
                stopServer();
                connection.disconnect();
            });
    });
};

connect().then(listen).catch(console.error);
