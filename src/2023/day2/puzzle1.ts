import { readFile } from '../../utils/getDataFile.js'
import { COLORS, lineToGame } from './gameService.js'

const GAME_LIMITS = {
    red:12,
    green:13,
    blue:14,
}

export const solve = () => {
    const datas = readFile(2, 1)
    const games = datas.map(lineToGame)
    return games.filter(isValidGame).reduce((acc, current)=> acc + current.id, 0);
}


const isValidGame = (game: Game): boolean => {
    return game.sets.reduce((acc, current) => acc && isValidSet(current), true)
}

const isValidSet = (set: GameSet): boolean => {
    return COLORS.reduce((acc, color) => acc && (set[color] === undefined || set[color]! <= GAME_LIMITS[color]), true)
}