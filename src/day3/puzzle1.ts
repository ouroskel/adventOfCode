import { readFile } from '../utils/getDataFile.js'
import { extractNumberAndSymbols, isAdgacent } from './numberService.js';

export const solve = (): number => {
    const datas = readFile(3, 1);
    const lines: Line[] = datas.map(extractNumberAndSymbols)

    const validNumbers: number[] = getValidNumbers([], lines[1].symbols, lines[0])
    for(let i=1; i< lines.length-1 ; i++){
        validNumbers.push(...getValidNumbers(lines[i-1].symbols, lines[i+1].symbols, lines[i]))
    }
    validNumbers.push(...getValidNumbers(lines[lines.length-2].symbols, [], lines[lines.length-1]))
    return validNumbers.reduce((acc, current) => acc+current)
}

const getValidNumbers = (previousLineSymbols: number[], nextLineSymbols: number[], currentLine: Line): number[] => {
    const validNumbers: number [] = [];
    const allSymbols = [...previousLineSymbols, ...currentLine.symbols, ...nextLineSymbols]

    for (const num of currentLine.numbers) {
        if(allSymbols.filter(symbol => isAdgacent(num, symbol)).length>0){
            validNumbers.push(num.value)
        }
    }
    return validNumbers;
}