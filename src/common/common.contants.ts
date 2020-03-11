import { IViberCarousel, ViberKeyboard, ViberKeyboardButton } from '../viber.interfaces';
import { SHARE } from '../random/random.constants';
import { MESSAGE_TEXT } from "./messages-text";

const Message = require('viber-bot').Message;

export interface ITextMessage {
    new (
        message: string,
        keyboard?: ViberKeyboard,
        optionalTrackingData?: string,
        timestamp?: string,
        token?: string,
        minApiVersion?: number,
    ): ITextMessage;
}

export interface IStickerMessage {
    new (stickerId: number): IStickerMessage;
}

export interface IKeyboardMessage {
    new (
        keyboard: ViberKeyboard,
        optionalTrackingData?: string,
        timestamp?: string,
        token?: string,
        minApiVersion?: number,
    ): IKeyboardMessage;
}

export interface IRichMediaMessage {
    new (
        carousel: IViberCarousel,
        optionalKeyboard?: ViberKeyboard,
        optionalTrackingData?: string,
        timestamp?: string,
        token?: string,
        optionalAltText?: string,
        minApiVersion?: number,
    ): IRichMediaMessage;
}

export const TextMessage: ITextMessage = Message.Text;
export const StickerMessage: IStickerMessage = Message.Sticker;
export const KeyboardMessage: IKeyboardMessage = Message.Keyboard;
export const RichMediaMessage: IRichMediaMessage = Message.RichMedia;
export const PictureMessage = Message.Picture;
export const UrlMessage = Message.Url;
export const VideoMessage = Message.Video;
export const FileMessage = Message.File;

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

export const MONGODB_URI_LOCAL = 'mongodb://viber-bot-node-starter:viber-bot-node-starter@0.0.0.0:27017/viber-bot-node-starter';
export const VIBER_TOKEN_LOCAL = 'viber-bot-node-starter';
export const CHAT_BOT_NAME = 'Viber Bot Node Starter';
export const CHAT_BOT_AVATAR = 'viber-bot-node-starter';
export const NGROK_URL = 'viber-bot-node-starter';
