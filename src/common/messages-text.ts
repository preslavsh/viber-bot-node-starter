import { enMessageText } from "./i18n/en.messages-text";
import { LANGUAGE } from "./language";

export const MESSAGES_TEXTS = {
    en: enMessageText,
    default: enMessageText,
};

export const MESSAGE_TEXT = MESSAGES_TEXTS[LANGUAGE];
