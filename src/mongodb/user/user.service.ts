import * as mongoose from 'mongoose';

interface RegisterUserData {
    viberId: string;
    country: string;
    language: string;
}

export class UserService {
    private readonly model: mongoose.Model<mongoose.Document, {}>;

    constructor(model: mongoose.Model<mongoose.Document, {}>) {
        this.model = model;
    }

    public register(userData: RegisterUserData): Promise<any> {
        let user = new this.model({
            _id: null,
            viberId: userData.viberId,
            country: userData.country,
            subscribed: true,
            language: userData.language, // to should register properly
        } as any);
        return user.save();
    };

    public updateSubscribed(viberId: string, subscribed: boolean): void {
        let update = {
            $set:{
                subscribed,
            }
        };
        this.model
            .findOneAndUpdate({ viberId }, update)
            .then(()=>console.log(`subscribed ${subscribed} update ${viberId}`))
            .catch(()=>console.error(`subscribed ${subscribed}  update failed ${viberId}`))
    };

    public findUserByViberId(viberId: string) : Promise<any> {
        return this.model.findOne({viberId}).exec();
    };

    public findAllSubscribed(): Promise<any[]> {
        return this.model.find({}).exec();
    }

}


