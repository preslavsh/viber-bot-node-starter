import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ViberUserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    viberId: String,
    country: String,
    language: String,
    subscribed: Schema.Types.Boolean,
    // TODO: Track consent for notifications
});

mongoose.model('ViberUser', ViberUserSchema);
