import { IViberBot, ViberResponse, ViberTextMessage } from '../viber.interfaces';
import { getRandomPattern } from "./random.constants";
import { LoggerFacade } from "../logger";
import { IMDB } from "../mongodb";
import { TextMessage, UrlMessage } from '../common/viber.constants';

const trackShareAction = (message: ViberTextMessage, logger: LoggerFacade, mdb: IMDB)=>{
    // TODO: Track random inputs as URL
    // Example
    // if(message.text === 'viber://pa?chatURI=viber-bot-node-starter') {
    //     nucleusLogger.track(NucleusMessage.Viber, '');
    // }
};

export const initRandomHandler = (bot: IViberBot, mdb: IMDB, logger: LoggerFacade) => {

    bot.onTextMessage(getRandomPattern(), (message: ViberTextMessage, response: ViberResponse) => {

        const isNotUrl = !(message instanceof UrlMessage)
            && message.text
            && message.text.indexOf("https") === -1
            && message.text.indexOf("http") === -1
            && message.text.indexOf("viber") === -1;

        trackShareAction(message, logger, mdb);

        if(isNotUrl || !message.text) {
            response.send([
                new TextMessage('RANDOM'),
            ]);
        }
    });

};
