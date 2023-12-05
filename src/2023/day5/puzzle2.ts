import { readFile } from '../../utils/getDataFile.js'
import { convertValue } from './converterService.js';
import { extractDatasV2 } from './dataService.js';

export const solve = (): number => {
    const datas = readFile(5, 2);
    const { seeds, converters } = extractDatasV2(datas)
    const finalIntervals = converters.reduce((acc, converter) => acc.flatMap((interval) => splitInterval(interval, converter)).map(interval => convertInterval(interval, converter)), seeds)
    console.log(JSON.stringify({finalIntervals}))
    return Math.min(...finalIntervals.map(interval => interval.start))
}


/**
 * Convertie un intervalle qui est entierement compris dans un converter ou qui n'a aucun converter
 */
const convertInterval = (interval: Interval, converters: Converters): Interval => {
    const converter = findFirstConverter(interval, converters);
    return converter ? { start: convertValue(interval.start, converter), end: convertValue(interval.end, converter) } : interval
}
/**
 * Split an interval in One interval per converter and filling intervals to cover the whoel interval
 */
const splitInterval = (interval: Interval, converters: Converters): Interval[] => {
    const validConverters = findConverters(interval, converters)
    if (validConverters.length === 0) {
        return [interval]
    }
    const [first, ...rest]: Converter[] = validConverters
    const intervals: Interval[] = []
    if (first.sourceStart > interval.start) {
        intervals.push({ start: interval.start, end: first.sourceStart - 1 })
        if (first.sourceEnd > interval.end) {
            intervals.push({ start: first.sourceStart, end: interval.end })
        } else {
            intervals.push({ start: first.sourceStart, end: first.sourceEnd })
        }
    } else {
        intervals.push({ start: interval.start, end: first.sourceEnd })
    }
    for (const converter of rest) {
        const lastInterval = intervals[intervals.length - 1]
        if (lastInterval.end < converter.sourceStart - 1) {
            intervals.push({ start: lastInterval.end + 1, end: converter.sourceStart - 1 })
        }
        if (converter.sourceEnd > interval.end) {
            intervals.push({ start: converter.sourceStart, end: interval.end })
        } else {
            intervals.push({ start: converter.sourceStart, end: converter.sourceEnd })
        }
    }
    const lastInterval = intervals[intervals.length - 1]
    if (lastInterval.end < interval.end) {
        intervals.push({ start: lastInterval.end + 1, end: interval.end })
    }
    //console.log(JSON.stringify({ interval, intervals, converters, validConverters }))
    return intervals;
}


/**
 * Récupère tous les converters nécessaire pour convertir le contenu d'un interval 
 */
const findConverters = (interval: Interval, converters: Converters): Converter[] => {
    const firstConverter: Converter | undefined = findFirstConverter(interval, converters)
    const middleConverters: Converter[] = findMiddleConverters(interval, converters)
    const lastConverter: Converter | undefined = findLastConverter(interval, converters)

    let allConverters: Converter[] = firstConverter ? [firstConverter] : []
    allConverters = [...allConverters, ...middleConverters]
    allConverters = lastConverter ? [...allConverters, lastConverter] : allConverters
    return allConverters.sort((a, b) => a.sourceStart - b.sourceStart)
}

/**
 * Récupère le converter pour le début d'un interval
 */
const findFirstConverter = (interval: Interval, converters: Converters): Converter | undefined => {
    return converters.converters.find(converter => converter.sourceStart <= interval.start && converter.sourceEnd >= interval.start)
}

/**
 * Récupère les converters pour le milieu d'un interval
 */
const findMiddleConverters = (interval: Interval, converters: Converters): Converter[] => {
    return converters.converters.filter(converter => converter.sourceStart > interval.start && converter.sourceEnd < interval.end)
}

/**
 * Récupère le converter pour la fin d'un interval
 */
const findLastConverter = (interval: Interval, converters: Converters): Converter | undefined => {
    return converters.converters.find(converter => converter.sourceStart <= interval.end && converter.sourceEnd >= interval.end)
}
