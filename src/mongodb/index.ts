import { IUserController } from './user/user.controller';
import { IRandomController } from "./random/random.controller";

export interface IMDB {
    userController: IUserController;
    randomController: IRandomController;
}

require('./user/user.model');
require('./random/random.model');
export const userController: IUserController = require('./user/user.controller');
export const randomController: IRandomController = require('./random/random.controller');
