import { UserCache } from "./index";

interface ICache {
    get(key: string): Promise<any>;
    set(key: string, value: any): void;
}

export class Cache implements ICache {
    private readonly cache: Record<string, Partial<UserCache>> = {};

    private setCache(userKey: string, cachedUser: Partial<UserCache>): void {
        this.cache[userKey] = cachedUser;
    }

    public get(key: string): Promise<Partial<UserCache>> {
        return Promise.resolve(this.cache[key]);
    }

    public set(userKey: string, userProperties: Partial<UserCache>): void {
        if(this.cache[userKey]) {
            let cachedUser = this.cache[userKey];
            cachedUser = {
                ...cachedUser,
                ...userProperties,
            };
            this.setCache(userKey, cachedUser);
        } else {
            this.setCache(userKey, userProperties);
        }
    }

}
