import { initGreetingsHandler } from './greeting/greeting.handler';
import { IViberBot } from './viber.interfaces';
import { initShareHandler } from './share/share.handler';
import { initRandomHandler } from './random/random.handler';
import * as mongoose from 'mongoose';
import mdb from './mongodb';
import { initSubscribeHandler } from './subscribe/subscribe.handler';
import {
    CHAT_BOT_AVATAR,
    CHAT_BOT_NAME,
    MONGODB_URI_LOCAL,
    NGROK_URL,
    VIBER_TOKEN_LOCAL
} from './common/common.contants';
import {initSetupHandler} from "./setup/setup.handler";
import {initSettingsHandler} from "./settings/settings.handler";
import { LoggerFacade } from "./logger";
import { initBroadcastHandler } from "./scripts/broacast.handler";
import { Cache } from "./cache";

const port = process.env.PORT || 3000;
const TOKEN = process.env.VIBER_TOKEN || VIBER_TOKEN_LOCAL;
const webhookUrl = process.env.WEBHOOK || NGROK_URL;
const MONGODB_URI = process.env.MONGODB_URI || MONGODB_URI_LOCAL;

export const Viber  = require('viber-bot');
const ViberBot  = Viber.Bot;
export const bot: IViberBot = new ViberBot({
    authToken: TOKEN,
    name: CHAT_BOT_NAME,
    avatar: CHAT_BOT_AVATAR,
    // Custom logger
    // logger: {
    //     debug: console.log,
    //     error: console.error,
    //     info: console.log,
    //     warn: console.log,
    // }
});

let app = bot.middleware();
export interface UserCache {
    viberId: string,
    subscribed: boolean;
    neck: boolean;
    upperBack: boolean;
    lowerBack: boolean;
    eyes: boolean;
    wrists: boolean;
    armsShoulders: boolean;
    time: number;
    showNotifications: boolean;
}

const cache = new Cache();
const logger = new LoggerFacade();

initBroadcastHandler(bot, mdb, logger);
initGreetingsHandler(bot, mdb, cache, logger);
initSetupHandler(bot, mdb, cache, logger);
initSettingsHandler(bot, mdb, cache, logger);
initShareHandler(bot, mdb, logger);
initSubscribeHandler(bot, mdb, cache, logger);
initRandomHandler(bot, mdb, logger);

bot.onError((error) => {
    console.error('bot caught error', error);
});

const connect = () => {
    return mongoose.connect(MONGODB_URI,  { useNewUrlParser: true, useFindAndModify: false });
};

const listen = (): void => {
    console.log('mongo started');
    app.listen(port, ()=>{
        console.log("Started");
        bot.setWebhook(webhookUrl).then(console.log).catch(console.error);
    });
};

connect().then(listen).catch(console.error);
