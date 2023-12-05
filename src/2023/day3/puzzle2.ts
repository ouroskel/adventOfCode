import { readFile } from '../../utils/getDataFile.js'
import { extractNumberAndSymbols, isAdgacent } from './numberService.js';


export const solve = (): number => {
    const datas = readFile(3, 2);
    const lines: Line[] = datas.map(extractNumberAndSymbols)

    const gearRatios: number[] = getGearRatios([], lines[1].numbers, lines[0])
    for (let i = 1; i < lines.length - 1; i++) {
        gearRatios.push(...getGearRatios(lines[i - 1].numbers, lines[i + 1].numbers, lines[i]))
    }
    gearRatios.push(...getGearRatios(lines[lines.length - 2].numbers, [], lines[lines.length - 1]))
    return gearRatios.reduce((acc, current) => acc + current)
}


const getGearRatios = (previousLineNumbers: GridNumber[], nextLineNumbers: GridNumber[], currentLine: Line) => {
    const gearRatios: number[] = []
    const allNumbers = [...previousLineNumbers, ...currentLine.numbers, ...nextLineNumbers]
    for (const gear of currentLine.gears) {
        const adjacentNumbers = allNumbers.filter(number => isAdgacent(number, gear))
        if (adjacentNumbers.length === 2) {
            gearRatios.push(adjacentNumbers[0].value * adjacentNumbers[1].value)
        }
    }
    return gearRatios;
}