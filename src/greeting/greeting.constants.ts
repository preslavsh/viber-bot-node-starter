import { ViberKeyboard } from '../viber.interfaces';
import { BEGIN } from '../random/random.constants';
import { MESSAGE_TEXT } from '../common/messages-text';
import { primaryColor, secondaryColor } from "../common/common.utils";

export const greetingsKeyboard: ViberKeyboard = {
    Type: "keyboard",
    BgColor: `${secondaryColor}`,
    InputFieldState: 'hidden',
    Buttons: [{
        Columns: 6,
        Rows: 1,
        ActionType: "reply",
        ActionBody: `${BEGIN}`,
        BgColor: `${primaryColor}`,
        Text: `<font color="${secondaryColor}">${MESSAGE_TEXT.GREETINGS_KEYBOARD_BUTTON}</font>`,
        TextSize: "regular"
    }]
};

