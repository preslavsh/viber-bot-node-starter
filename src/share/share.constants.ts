import { secondaryColor } from '../common/common.contants';
import { ActionType, IViberCarousel } from '../viber.interfaces';

export const shareCarouselButtonDefaultProperties = {
    Columns: 3,
    Rows: 3,
    ActionType: "open-url" as ActionType,
};

export const shareCarousel: IViberCarousel = {
    ButtonsGroupColumns: 6,
    ButtonsGroupRows: 6,
    BgColor: `${secondaryColor}`,
    Buttons: [
        {
            ...shareCarouselButtonDefaultProperties,
            OpenURLType : "internal",
            ActionBody: "https://viber-bot-node-starter.com",
            Image: "https://viber-bot-node-starter.com/logo.png",
            BgColor: `${secondaryColor}`,
        },
        {
            ...shareCarouselButtonDefaultProperties,
            OpenURLType : "internal",
            ActionBody: `viber://forward?text=viber://pa?chatURI=viber-bot-node-starter`,
            Image: "http://stretchbit.com/viber.png"
        },
        {
            ...shareCarouselButtonDefaultProperties,
            ActionBody: "https://www.facebook.com/viber-bot-node-starter",
            Image: "http://viber-bot-node-starter/facebook.jpg"
        },
        {
            ...shareCarouselButtonDefaultProperties,
            ActionBody: "https://www.linkedin.com/viber-bot-node-starter",
            Image: "http://viber-bot-node-starter/linkedin.png"
    }]
};
