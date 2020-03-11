import * as mongoose from 'mongoose';
const ViberRandomModel = mongoose.model('ViberRandom');

export interface IRandomController {
    createRandomModel: (text: string) => Promise<any>;
}

export const createRandomModel = (text: string): Promise<any> =>{
    let randomModel = new ViberRandomModel({
        _id: null,
        text,
    } as any);
    return randomModel.save();
};
