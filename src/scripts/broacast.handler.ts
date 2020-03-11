import { LoggerFacade } from "../logger";
import { IViberBot } from "../viber.interfaces";
import { IMDB } from "../mongodb";
import { CronJob } from 'cron';
import { UserCache } from "../index";
import * as countriesTimezones from 'countries-and-timezones';

const calculateUserTime = (offset: string,): Date => {
    const serverDate = new Date();
    const utcTime = serverDate.getTime() + (serverDate.getTimezoneOffset() * 60000);
    return new Date(utcTime + (3600000 * parseInt(offset)));
};

export const shouldSendMessages = (currentUser: any, shouldBroadcastValidator: (hour: number) => boolean): boolean => {
    let timezones = undefined;
    /** Since countries-and-timezones doesnt recognise Kosovo iso alpha 2 code as a country */
    if(currentUser.country === 'XK') {
        timezones = [{utcOffsetStr: '+1'}];
    } else {
        timezones = countriesTimezones.getTimezonesForCountry(currentUser.country);
    }
    if(!timezones) {
        console.error('No time zone found for', currentUser.country);
        return false;
    }
    const firstTimezone = timezones[0];
    const utcOffset = firstTimezone.utcOffsetStr;
    const currentUserHour = calculateUserTime(utcOffset).getHours();
    return shouldBroadcastValidator(currentUserHour);
};

const getBroadcastMessages = (currentUser: UserCache): any[] => {
    return [];
};

const broadcastToSingleUser = async (
    bot: IViberBot,
    currentUser: UserCache,
    mdb: IMDB) => {
    const currentUserId = currentUser.viberId;
    const messages = getBroadcastMessages(currentUser);
    try {
        console.log(`currentUser: ${currentUserId}`);
        await bot.sendMessage( { id: currentUserId } , messages);
        console.log(`broadcastToSingleUser Message was sent to user with id: ${ currentUserId }`);
    } catch (error) {
        console.error(`broadcastToSingleUser error: ${JSON.stringify(error)}: currentUserId: ${currentUserId}`);
        if(error && error.status === 5 && error.status_message === 'receiverNotRegistered') {
            mdb.userService.updateSubscribed(currentUserId, false);
        }
        if(error && error.status === 6 && error.status_message === 'notSubscribed') {
            mdb.userService.updateSubscribed(currentUserId, false);
        }
        if(error && error.status === 13 && error.status_message === 'apiVersionNotSupported') {
            // TODO: Implement stop him from receiving notifications
        }
        if(error && error.status === 11 && error.status_message === 'receiverNoSuitableDevice') {
            // TODO: Implement stop him from receiving notifications
        }
    }
};

const shouldBroadcastValidator = (): boolean =>  {
    return true;
};

const broadcastMessages = async (bot: IViberBot, mdb: IMDB, time: number, logger: LoggerFacade)=> {
    const mongooseUsers = await mdb.userService.findAllSubscribed();
    const users = mongooseUsers.map((user)=>user.toJSON());
    console.log('==============================================================');
    console.log( `Running job on every ${time} with users length: ${users.length}`);
    console.log('==============================================================');
    for(let index = 0; index < users.length; index++) {
        if(shouldSendMessages(users[index], shouldBroadcastValidator)) {
            try {
                await broadcastToSingleUser(bot, users[index], mdb);
            } catch (e) {
                console.error('broadcastMessages for loop error', JSON.stringify(e));
            }
        }
    }
};

export const initBroadcastHandler = (bot: IViberBot, mdb: IMDB, logger: LoggerFacade) => {

    // NOTE: Using https://crontab.guru/#1_*_*_*_1,2,3,4,5 to validate
    const cronJob30 = new CronJob('*/30 * * * 1,2,3,4,5', async () => {
        await broadcastMessages(bot, mdb, 30, logger);
    });
    cronJob30.start();

    // TODO: Add handling of the broadcaster message actions
};




