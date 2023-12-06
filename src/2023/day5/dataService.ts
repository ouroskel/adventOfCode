const LINE_SEPARATOR = ''
const VALUE_SEPARATOR = ' '

export const extractDatas = (datas: string[]): Datas => {
    return { seeds: lineToSeeds(datas[0]), converters: datasToConverters(datas) }
}

export const extractDatasV2 = (datas: string[]): DatasV2 => {
    return { seeds: datasToSeed(datas[0]), converters: datasToConverters(datas) }
}

const datasToSeed = (line: string) : Interval[] => {
    const seedNumbers = lineToSeeds(line);
    const seeds : Interval[] = []
    for (let i = 0; i < seedNumbers.length; i+=2) {
        seeds.push({start:seedNumbers[i], end:seedNumbers[i]+seedNumbers[i+1]-1})
    }
    return seeds
}

const lineToSeeds = (line: string): number[] => {
    return line.split(':')[1].split(VALUE_SEPARATOR).filter(s => !!s).map(value => Number.parseInt(value))
}

const datasToConverters = (datas: string[]): Converters[] => {
    const splits: number[] = findSplitLines(datas)

    const convertersLines: string[][] = []
    for (let i = 0; i < splits.length - 1; i++) {
        convertersLines.push(datas.slice(splits[i] + 1, splits[i + 1]))
    }
    convertersLines.push(datas.slice(splits[splits.length-1] + 1, datas.length))

    return convertersLines.map(linesToConverters)
}

/**
 * find the index of the empty lines separating each blocks 
 */
const findSplitLines = (datas: string[]): number[] => {
    const splits: number[] = []
    let lineSeparatorIndex = datas.indexOf(LINE_SEPARATOR)
    while (lineSeparatorIndex !== -1) {
        splits.push(lineSeparatorIndex);
        lineSeparatorIndex = datas.indexOf(LINE_SEPARATOR, lineSeparatorIndex + 1)
    }
    return splits
}

const linesToConverters = (lines: string[]): Converters => {
    const [header, ...valueLines] = lines
    return { converters: valueLines.map(lineToConverter), name:header }
}

const lineToConverter = (line: string): Converter => {
    const [targetStart, sourceStart, sourceLength] = line.split(VALUE_SEPARATOR).map(value => Number.parseInt(value))
    return { sourceStart, sourceEnd: sourceStart + sourceLength - 1, targetStart }
}