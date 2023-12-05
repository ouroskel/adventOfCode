import { readFile } from '../../utils/getDataFile.js'
import { findSeedLocation } from './converterService.js';
import { extractDatas } from './dataService.js';

export const solve = (): number => {
    const rawDatas = readFile(5, 1);
    const {seeds, converters} = extractDatas(rawDatas)
    const locations = seeds.map(seed => findSeedLocation(seed, converters))
    return Math.min(...locations)
}
