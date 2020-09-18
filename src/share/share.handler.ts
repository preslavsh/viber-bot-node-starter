import { IViberBot, ViberResponse, ViberTextMessage } from '../viber.interfaces';
import { shareCarousel } from './share.constants';
import { SHARE } from '../random/random.constants';
import { IMDB } from '../mongodb';
import { MESSAGE_TEXT } from '../common/messages-text';
import { LoggerFacade, LoggerMessage } from "../logger";
import { getNewKeyboardMessage, mainMenuKeyboard } from "../common/common.utils";
import { RichMediaMessage, TextMessage } from '../common/viber.constants';

export const initShareHandler = (bot: IViberBot, mdb: IMDB, logger: LoggerFacade) => {

    bot.onTextMessage(new RegExp(`^${SHARE}`, "i"), (message: ViberTextMessage, response: ViberResponse) => {
        response.send([
            new TextMessage(MESSAGE_TEXT.SHARE),
            new RichMediaMessage(shareCarousel),
            getNewKeyboardMessage(mainMenuKeyboard),
        ]);
        logger.track(LoggerMessage.Share, '');
    });

};

