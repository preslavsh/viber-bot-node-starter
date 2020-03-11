import * as mongoose from 'mongoose';

export class RandomService {

    private readonly model: mongoose.Model<mongoose.Document, {}>;

    constructor(model: mongoose.Model<mongoose.Document, {}>) {
        this.model = model;
    }

    public create(text: string): Promise<any> {
        let randomModel = new this.model({
            _id: null,
            text,
        } as any);
        return randomModel.save();
    };

}

