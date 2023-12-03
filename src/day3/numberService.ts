const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export const extractNumberAndSymbols = (line: string): Line => {
    const res: Line = {
        symbols: [],
        gears:[],
        numbers: []
    }
    for (let i = 0; i < line.length; i++) {
        const char = line[i]
        if (char === '.') { }
        else if (NUMBERS.includes(char)) {
            const numberStart: number = i;
            let numberEnd: number;
            let numberValue: string = char;
            while (NUMBERS.includes(line[i + 1])) {
                numberValue += line[i + 1]
                i++
            }
            numberEnd = i;
            res.numbers.push({
                position: { start: numberStart, end: numberEnd },
                value: Number.parseInt(numberValue)
            })
        }
        else if(char === '*'){
            res.symbols.push(i)
            res.gears.push(i)
        }
        else {
            res.symbols.push(i)
        }
    }
    return res;
}
