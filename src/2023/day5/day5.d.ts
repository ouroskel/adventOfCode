interface Converter {
    sourceStart: number,
    sourceEnd: number,
    targetStart:number
}

interface Datas {
    seeds: number[]
    converters: Converters[]
}

interface Converters {
    converters: Converter[]
    name: string
}

interface DatasV2 {
    seeds: Interval[],
    converters: Converters[]
}

interface Interval {
    start: number, 
    end : number
}