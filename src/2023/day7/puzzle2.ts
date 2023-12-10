import { readFile } from '../../utils/getDataFile.js'
import { parseLine } from './cardsService.js';

export const solve = (): number => {
    const rawDatas = readFile(7, 2);
    const hands: Hand[] = rawDatas.map(parseLine)
    return 0
}