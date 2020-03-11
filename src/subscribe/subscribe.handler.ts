import { IViberBot, ViberResponse } from '../viber.interfaces';
import { IMDB } from '../mongodb';
import { LoggerFacade, LoggerMessage } from "../logger";
import { getNewKeyboardMessage, getNewTextMessage } from "../common/common.contants";
import { greetingsKeyboard } from "../greeting/greeting.constants";
import { MESSAGE_TEXT } from "../common/messages-text";
import { Cache } from "../cache";

export const initSubscribeHandler = (bot: IViberBot, mdb: IMDB, cache: Cache, logger: LoggerFacade) => {

    bot.onSubscribe(async (response: ViberResponse) => {
        const viberId = response.userProfile.id;
        const country = response.userProfile.country;
        const language = response.userProfile.language;
        const user = await mdb.userService.findUserByViberId(viberId);

        if(!user) {
            mdb.userService
                .register( { viberId, country, language })
                .then(console.log)
                .catch(console.error);
        }

        bot.sendMessage( { id: viberId }, [
            getNewTextMessage(MESSAGE_TEXT.GREETINGS_FIRST_TIME),
            getNewKeyboardMessage(greetingsKeyboard),
        ]);

        logger.track(LoggerMessage.Subscribed);
    });

    bot.onUnsubscribe((viberId: string) => {
        mdb.userService.updateSubscribed(viberId, false);
        logger.track(LoggerMessage.UnSubscribed);
    });

};
