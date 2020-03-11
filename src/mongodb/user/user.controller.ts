import * as mongoose from 'mongoose';
const ViberUserModel = mongoose.model('ViberUser');

interface RegisterUserData {
    viberId: string;
    country: string;
    language: string;
}

export interface IUserController {
    registerUser: (userData: RegisterUserData) => Promise<any>;
    findUserByName: (username: string,cb: any)=> void;
    findUserByViberId: (viberId: any) => Promise<any>;
    findUserById: (userId: any) => Promise<any>;
    updateSettings: (viberId: string, settings: any) => void;
    updateShowNotifications: (viberId: string, showNotifications: boolean) => void;
    updateShowNotificationsAndTime: (viberId: string, showNotifications: boolean, time: number) => void;
    updateNotificationTime: (viberId: string, time: number) => void;
    updateSubscribed: (viberId: string, subscribed: boolean) => void;
    findAllSubscribedWithConsent: (time: number) => Promise<mongoose.Document[]>;
    increaseTakenExerciseCount: (viberId: string) => void;
}

export const registerUser = (userData: RegisterUserData): Promise<any> =>{
    let user = new ViberUserModel({
        _id: null,
        viberId: userData.viberId,
        country: userData.country,
        subscribed: true,
        neck: false,
        upperBack: false,
        lowerBack: false,
        eyes: false,
        wrists: false,
        armsShoulders: false,
        time: 60,
        showNotifications: false,
        language: userData.language, // to should register properly
        takenExerciseCount: 0,
    } as any);
    return user.save();
};

export const updateShowNotifications = (viberId: string, showNotifications: boolean): void => {
    let update = {
        $set:{
            showNotifications,
        }
    };
    ViberUserModel
        .findOneAndUpdate({ viberId }, update)
        .then(()=>console.log(`showNotifications ${showNotifications} update ${viberId}`))
        .catch(()=>console.error(`showNotifications ${showNotifications} update failed ${viberId}`));
};

export const updateShowNotificationsAndTime = (viberId: string, showNotifications: boolean, time: number): void => {
    let update = {
        $set:{
            showNotifications,
            time,
        }
    };
    ViberUserModel
        .findOneAndUpdate({ viberId }, update)
        .then(()=>console.log(`showNotificationsAndTime ${showNotifications} ${time} update ${viberId}`))
        .catch(()=>console.error(`showNotificationsAndTime ${showNotifications} ${time} update failed ${viberId}`));
};

export const updateSettings = (viberId: string, settings: any): void => {
    let update = {
        $set: {...settings}
    };
    ViberUserModel
        .findOneAndUpdate({ viberId }, update)
        .then(console.log)
        .catch(console.error);
};

export const updateNotificationTime = (viberId: string, time: number): void => {
    let update = {
        $set:{
            time,
        }
    };
    ViberUserModel
        .findOneAndUpdate({ viberId }, update)
        .then(()=>console.log(`time ${time} update ${viberId}`))
        .catch(()=>console.error(`time ${time}  update failed ${viberId}`))
};

export const updateSubscribed = (viberId: string, subscribed: boolean): void => {
    let update = {
        $set:{
            subscribed,
        }
    };
    /** NOTE: the then staments returns the old model not the new one */
    ViberUserModel
        .findOneAndUpdate({ viberId }, update)
        .then(()=>console.log(`subscribed ${subscribed} update ${viberId}`))
        .catch(()=>console.error(`subscribed ${subscribed}  update failed ${viberId}`))
};

export const findUserByName = (username: string,cb: any)=>{
    ViberUserModel.findOne({name},cb)
};

export const findUserByViberId = (viberId: string) : Promise<any> => {
    return ViberUserModel.findOne({viberId}).exec();
};

export const findUserById = (userId: any,cb: any)=>{
    ViberUserModel.findById(userId,cb);
};

export const findAllSubscribedWithConsent = (time: number): Promise<mongoose.Document[]> => {
    return ViberUserModel.find({
        showNotifications: true,
        subscribed: true,
        time,
    }).exec();
};

// export const findAllSubscribedNoExerciseTakenNoSendSubscribeMessage = (size: number = 100): Promise<UserCache[]> => {
//     return ViberUserModel.aggregate([
//         { $match: {
//                 subscribed: true,
//                 sendSubscribeMessage: false,
//                 takenExerciseCount: 0
//             }
//         },
//         { $sample: { size } }
//     ]).exec();
// };


export const increaseTakenExerciseCount = (viberId: string): void => {
    const increment = {
        $inc: {
            takenExerciseCount: 1
        }
    };
    ViberUserModel
        .findOneAndUpdate({ viberId }, increment)
        .then(() => console.log(`takenExerciseCount ${viberId}`))
        .catch(() => console.error(`takenExerciseCount error ${viberId}`));
};

// export const updateSendSubscribeMessage = (viberIds: string[], cb: any): void => {
//     let update = {
//         $set:{
//             sendSubscribeMessage: true,
//         }
//     };
//
//     ViberUserModel.updateMany({ viberId: {$in: viberIds } }, update)
//         .then(cb)
//         .catch(console.error);
// };
