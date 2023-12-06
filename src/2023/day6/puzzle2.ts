import { readFile } from '../../utils/getDataFile.js'
import { getValidTimes } from './raceService.js';

export const solve = (): number => {
    const rawDatas = readFile(6, 1);
    const race = parseDatasToRace(rawDatas)
    const wins = getValidTimes(race)
    return wins.length;
}

const parseDatasToRace = (datas: string[]): Race => {
    const time = Number.parseInt(datas[0].split(':')[1].split(' ').filter(s => !!s).join(''))
    const distance = Number.parseInt(datas[1].split(':')[1].split(' ').filter(s => !!s).join(''))
    return {time, distance}
}
