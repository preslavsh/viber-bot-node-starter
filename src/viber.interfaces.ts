export interface ViberUserProfile {
    id: string, // hash
    name: string, // the name in language of the user
    avatar: string, // Url to the picture
    country: string,
    language: string,
    apiVersion: number;
}

export interface ViberTextMessage {
    text: string,
    timestamp: number, // milliseconds
    token: string,
    trackingData: any,
    keyboard: any,
    requiredArguments: string[],
    minApiVersion: undefined;
}

type ConversationStarted = (userProfile: ViberUserProfile,
                            isSubscribed: boolean,
                            context: any,
                            onFinish: any) => any;

export interface OnlineUser {
    id: string;
    online_status: number;
    online_status_message: 'online' | string
    last_online: number;
}

export interface OnlineStatus {
    status: number,
    status_message: string,
    users: OnlineUser[]
}

export interface IViberBot {
    onConversationStarted: (fn: ConversationStarted)=> void;
    onTextMessage: (pattern: RegExp, callback: (message: ViberTextMessage, response: any) => any) => any;
    middleware: () => any;
    onError: (callback: (error: any) => any) => any;
    setWebhook: (webhook: string) => Promise<any>;
    onSubscribe: (callback: (response: ViberResponse) => void ) => void;
    sendMessage: (minUserProfile: { id: string }, messages: any[]) => Promise<any>;
    onUnsubscribe: (callback: (userId: string) => void) => void;
    // Can only be requested for 100 user at a time
    getOnlineStatus: (viberIds: string[]) => Promise<OnlineStatus>;
    on: any;
}

export type ActionType = "reply" | "open-url" | "none";

// https://developers.viber.com/docs/tools/keyboards/
export interface ViberKeyboard {
    Type: 'keyboard'
    BgColor: string; // hex color
    Buttons: ViberKeyboardButton[];
    InputFieldState?: 'regular' | 'minimized' | 'hidden'
}

export interface ViberKeyboardButton {
    Columns?: number,
    Rows?: number,
    ActionType?: ActionType,
    ActionBody: string,
    BgColor?: string; // hex color
    Text: string; // simple html
    TextSize?: 'regular'
    OpenURLType? : "internal" | "external",
    Frame?: {
        BorderWidth?: number, // 0 to 10 default 1
        BorderColor?: string, // hex
        CornerRadius?: number, // 0 to 10 default 0
    }
}

export interface IViberCarousel {
    ButtonsGroupColumns: number,
    ButtonsGroupRows: number,
    BgColor: string,
    Buttons: IViberCarouselButton[]
    HeightScale?: number,
}

export interface IViberCarouselButton {
    Columns?: number;
    Rows?: number;
    ActionType?: ActionType;
    ActionBody?: string;
    Image?: string;
    OpenURLType?: string;
    Text?: string; // max 250 characters
    TextSize?: string;
    TextVAlign?: string;
    TextHAlign?: string;
    BgColor?: string;
    BgMedia?: string,
    BgMediaType?: string,
    InternalBrowser?: {
        ActionButton: string;
        ActionPredefinedURL: string;
    },
    ImageScaleType?: 'fill' | 'crop' | 'fit',
    TextShouldFit?: boolean
    TextPaddings?: number[] // [12,12,12,12] [top, left, bottom, right]
}

export interface ViberResponse {
    userProfile: ViberUserProfile,
    send: (messages: any | any[]) => void;
}
