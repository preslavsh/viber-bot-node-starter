import { IViberBot, ViberResponse, ViberTextMessage, ViberUserProfile } from '../viber.interfaces';
import { greetingsKeyboard } from './greeting.constants';
import { BEGIN } from '../random/random.constants';
import { IMDB } from '../mongodb';
import { MESSAGE_TEXT } from "../common/messages-text";
import { LoggerFacade, LoggerMessage } from "../logger";
import { Cache } from "../cache";
import { getNewTextMessage, mainMenuKeyboard } from "../common/common.utils";

export const initGreetingsHandler = (bot: IViberBot, mdb: IMDB, cache: Cache, logger: LoggerFacade) => {

    bot.onConversationStarted(async (userProfile: ViberUserProfile, isSubscribed: boolean, context: any, onFinish: any) => {
        if(isSubscribed) {
            onFinish(getNewTextMessage(MESSAGE_TEXT.GREETINGS_AGAIN, mainMenuKeyboard));
        } else {
            onFinish(getNewTextMessage(MESSAGE_TEXT.GREETINGS_FIRST_TIME, greetingsKeyboard));
        }
        logger.track(LoggerMessage.Initiated, '');
    });

    bot.onTextMessage(new RegExp(`^${BEGIN}`, "i"), async (message: ViberTextMessage, response: ViberResponse) => {
        // TODO: Add registration
        // TODO: Add Message
        response.send([]);
        logger.track(LoggerMessage.Begin, '');
    });

};

