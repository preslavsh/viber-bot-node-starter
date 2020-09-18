import { stickers } from './stickers';
import { gifs } from "./gifs";
import { IViberCarousel, ViberKeyboard, ViberKeyboardButton } from "../viber.interfaces";
import { SHARE } from "../random/random.constants";
import { MESSAGE_TEXT } from "./messages-text";
import { IKeyboardMessage, IRichMediaMessage, ITextMessage, KeyboardMessage, RichMediaMessage, TextMessage } from "./viber.constants";

export const getRandomNumber = (range: number): number => {
    return Math.floor(Math.random() * range);
};

export const getRandomStickerId = (): number => stickers[getRandomNumber(stickers.length)];

export const getRandomGif = (): string => gifs[getRandomNumber(gifs.length)];

export const primaryColor = "#648cff";
export const secondaryColor = "#ffffff";

export const getNewKeyboardMessage = (keyboard: ViberKeyboard, minApiVersion: number = 4): IKeyboardMessage =>
    new KeyboardMessage(
        keyboard, undefined, undefined, undefined, minApiVersion
    );

export const getRichMediaMessage = (carousel: IViberCarousel): IRichMediaMessage =>
    new RichMediaMessage(
        carousel, null, null, null, null, null, 6,
    );

export const getNewTextMessage = (message: string, keyboard?: ViberKeyboard): ITextMessage =>
    new TextMessage(
        message,
        keyboard,
        null,
        null,
        null,
        4,
    );

const mainKeyBoardButtonDefaultProperties: Partial<ViberKeyboardButton> = {
    Rows: 1,
    ActionType: "reply",
    BgColor: `${primaryColor}`,
    TextSize: "regular",
};

export const mainMenuKeyboard: ViberKeyboard = {
    Type: "keyboard",
    BgColor: `${secondaryColor}`,
    InputFieldState: 'hidden',
    Buttons: [
        {
            ...mainKeyBoardButtonDefaultProperties,
            Columns: 3,
            ActionBody: `${SHARE}`,
            Text: `<font color=\"${secondaryColor}\">${MESSAGE_TEXT.MAIN_KEYBOARD_SHARE}</font>`,
        },
    ]
};
