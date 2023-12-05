import { readFile } from '../../utils/getDataFile.js'
import { NUMBERS, getFirstElementInString, getLastElementInString, toNumberString } from './stringService.js'

export const solve = (): number => {
    const datas = readFile(1, 1)
    const calibrationValues = datas.map(calculateValue)
    return calibrationValues.reduce((acc, current) => acc + current)
}

const calculateValue = (text: string): number => {
    const first = getFirstElementInString(NUMBERS, text);
    const last = getLastElementInString(NUMBERS, text);
    return Number.parseInt(toNumberString(first) + toNumberString(last))
}
