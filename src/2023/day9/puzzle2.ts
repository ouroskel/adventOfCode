import { readFile } from '../../utils/getDataFile.js'
import { getPreviousInSequence, parseSequence } from './sequenceService.js';

export const solve = (): number => {
    const datas: string[] = readFile(9, 1);
    const sequences: number[][] = datas.map(parseSequence)
    const previousInSequences = sequences.map(getPreviousInSequence)
    return previousInSequences.reduce((acc, curr) => acc + curr)
}