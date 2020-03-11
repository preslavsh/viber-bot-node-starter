import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ViberRandomSchema = new Schema({
    _id: Schema.Types.ObjectId,
    text: String,
});

mongoose.model('ViberRandom', ViberRandomSchema);
