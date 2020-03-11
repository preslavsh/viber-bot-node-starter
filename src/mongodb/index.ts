import * as mongoose from "mongoose";
import { UserService } from "./user/user.service";
import { RandomService } from "./random/random.service";

export interface IMDB {
    userService: UserService;
    randomService: RandomService;
}

export enum SchemasName {
    ViberUser = 'ViberUser',
    ViberRandom = 'ViberRandom',
}

require('./user/user.model');
require('./random/random.model');

const UserModel = mongoose.model(SchemasName.ViberUser);
const RandomModel = mongoose.model(SchemasName.ViberRandom);

const userService = new UserService(UserModel);
const randomService = new RandomService(RandomModel);

export default { userService, randomService } as IMDB;
