import * as mongoose from 'mongoose';
import { SchemasName } from "../index";
const Schema = mongoose.Schema;

export const ViberUserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    viberId: String,
    country: String,
    language: String,
    subscribed: Schema.Types.Boolean,
    // TODO: Track consent for notifications
});

mongoose.model(SchemasName.ViberUser, ViberUserSchema);
