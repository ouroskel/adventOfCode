import { readFile } from '../utils/getDataFile.js'
import { extractNumberAndSymbols } from './numberService.js';


export const solve = (): number => {
    const datas = readFile(3, 1);
    const lines: Line[] = datas.map(extractNumberAndSymbols)

    let gearRatios: number[] = getGearRatios([], lines[1].numbers, lines[0])
    for (let i = 1; i < lines.length - 1; i++) {
        gearRatios.push(...getGearRatios(lines[i - 1].numbers, lines[i + 1].numbers, lines[i]))
    }
    gearRatios.push(...getGearRatios(lines[lines.length - 2].numbers, [], lines[lines.length - 1]))
    return gearRatios.reduce((acc, current) => acc + current)
}


const getGearRatios = (previousLineNumbers: GridNumber[], nextLineNumbers: GridNumber[], currentLine: Line) => {
    let gearRatios: number[] = []
    for (const gear of currentLine.gears) {
        const previousAdjacentNumbers = previousLineNumbers.filter(number => isAdgacent(number, gear))
        const currentAdjacentNumbers = currentLine.numbers.filter(number => isAdgacent(number, gear))
        const nextAdjacentNumbers = nextLineNumbers.filter(number => isAdgacent(number, gear))
        const adjacentNumbers = [...previousAdjacentNumbers, ...currentAdjacentNumbers, ...nextAdjacentNumbers]
        if (adjacentNumbers.length === 2) {
            gearRatios.push(adjacentNumbers[0].value * adjacentNumbers[1].value)
        }
    }
    return gearRatios;
}

const isAdgacent = (number: GridNumber, symbol: number) => {
    return symbol >= number.position.start - 1 && symbol <= number.position.end + 1
}