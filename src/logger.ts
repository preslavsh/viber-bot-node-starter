export enum LoggerMessage {
    Begin = 'begin',
    Initiated = 'initiated',
    Subscribed = 'subscribed',
    UnSubscribed = 'unsubscribed',
    Share = 'share',
    Viber = 'viber',
    Facebook = 'facebook',
    LinkedIn = 'linkedIn',
    VKontakte = 'vkontakte',
    OpenWebsite = 'openWebsite',
    Random = 'random',
    MessageToBot = 'message_to_bot',
    MessageFromBot = 'message_from_bot',
}

export class LoggerFacade {

    public track(eventName: LoggerMessage, payload?: any) {
        console.log(`${eventName}: ${payload}`);
    }

}
