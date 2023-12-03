interface Line {
    symbols: number[],
    gears: number[]
    numbers: GridNumber[]
}

interface GridNumber {
    position: Position
    value: number
}

interface Position {
    start: number,
    end: number
}
