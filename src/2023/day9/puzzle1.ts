import { readFile } from '../../utils/getDataFile.js'
import { getNextInSequence, parseSequence } from './sequenceService.js';

export const solve = (): number => {
    const datas: string[] = readFile(9, 1);
    const sequences: number[][] = datas.map(parseSequence)
    const nextInSequences = sequences.map(getNextInSequence)
    return nextInSequences.reduce((acc, curr) => acc + curr)
}