import { stickers } from './stickers';
import { gifs } from "./gifs";

export const getRandomNumber = (range: number): number => {
    return Math.floor(Math.random() * range);
};

export const getRandomStickerId = (): number => stickers[getRandomNumber(stickers.length)];

export const getRandomGif = (): string => gifs[getRandomNumber(gifs.length)];
