import * as fs from 'fs'

export const readFile = (day: number, puzzle: number): string[] => {
    const fileContent = fs.readFileSync('dataFiles/day' + day + '/puzzle' + puzzle + '.txt', 'utf8');
    return fileContent.split('\r\n')
}
