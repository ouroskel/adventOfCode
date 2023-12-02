import { readFile } from '../utils/getDataFile.js'
import { COLORS, lineToGame } from './gameService.js';

export const solve = () => {
    const datas = readFile(2, 1)
    const games = datas.map(lineToGame)
    return games.map(getGamePower).reduce((acc, current) => acc + current, 0);
}

const getGamePower = (game: Game) : number => {
    const limits: GameSet =  getGameLimits(game)
    return Object.values(limits).reduce((acc, current) => acc * current,1)
}

const getGameLimits = (game: Game): GameSet => {
    const sets = game.sets;
    return sets.reduce((acc: GameSet, set: GameSet) => {
        COLORS.forEach(color => acc[color] = getMax(acc[color], set[color]))
        return acc
    }, {})
}

const getMax = (a, b) => {
    return a === undefined ? b : b === undefined ? a : Math.max(a,b);
}