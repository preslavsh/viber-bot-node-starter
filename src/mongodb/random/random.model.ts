import * as mongoose from 'mongoose';
import { SchemasName } from "../index";
const Schema = mongoose.Schema;

export const ViberRandomSchema = new Schema({
    _id: Schema.Types.ObjectId,
    text: String,
});

mongoose.model(SchemasName.ViberRandom, ViberRandomSchema);
