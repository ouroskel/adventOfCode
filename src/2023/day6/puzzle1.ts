import { readFile } from '../../utils/getDataFile.js'
import { getValidTimes } from './raceService.js';

export const solve = (): number => {
    const rawDatas = readFile(6, 1);
    const races = parseDatasToRaces(rawDatas)
    const wins = races.map(getValidTimes)
    console.log(JSON.stringify({wins, races, rawDatas}))
    return wins.map(arr => arr.length).reduce((acc, curr) => acc * curr, 1);
}

const parseDatasToRaces = (datas: string[]): Race[] => {
    const times = datas[0].split(':')[1].split(' ').filter(s => !!s).map(s => Number.parseInt(s))
    const distances = datas[1].split(':')[1].split(' ').filter(s => !!s).map(s => Number.parseInt(s))
    const races: Race[] = []
    console.log(JSON.stringify({times, distances}))
    for (let i = 0; i < times.length; i++) {
        races.push({ time: times[i], distance: distances[i] })
        
    }
    return races
}
