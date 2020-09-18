import { IViberCarousel, ViberKeyboard } from "../viber.interfaces";

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
