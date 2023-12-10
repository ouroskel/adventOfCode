import { readFile } from '../../utils/getDataFile.js'
import { parseLine, sortHandsByValue } from './cardsService.js';

export const solve = (): number => {
    const rawDatas = readFile(7, 1);
    const hands: Hand[] = rawDatas.map(parseLine)
    const sortedHands = sortHandsByValue(hands)
    const handValues = sortedHands.map((hand, index) => hand.value * (index + 1))
    return handValues.reduce((acc, current) => acc + current)
}