import { readFile } from '../../utils/getDataFile.js'
import { convertValue } from './converterService.js';
import { extractDatasV2 } from './dataService.js';

export const solve = (): number => {
    console.time()
    const datas = readFile(5, 2);
    const { seeds, converters } = extractDatasV2(datas)
    const finalIntervals = converters.reduce(
        (acc, converter) => acc.flatMap((interval) => splitIntervalV2(interval, converter))
            .map(interval => convertInterval(interval, converter)), seeds)
    const res = Math.min(...finalIntervals.map(interval => interval.start))
    console.timeEnd()
    return res
}


/**
 * Convertit un intervalle qui est entierement compris dans un converter ou qui n'a aucun converter
 */
const convertInterval = (interval: Interval, converters: Converters): Interval => {
    const converter = findFirstConverter(interval, converters);
    const convertedInterval = converter ? { start: convertValue(interval.start, converter), end: convertValue(interval.end, converter) } : interval
    return convertedInterval
}

const splitIntervalV2 = (interval: Interval, converters: Converters): Interval[] => {
    const validConverters = findConverters(interval, converters)
    if (validConverters.length === 0) {
        return [interval]
    }
    return validConverters.reduce(reduceFunc, [interval])
}

const reduceFunc = (intervals: Interval[], converter: Converter): Interval[] => {
    const lastInterval = intervals[intervals.length - 1]
    const res = [...intervals.slice(0, intervals.length - 1), ...splitIntervalAroundConverter(lastInterval, converter)]
    return res
}
const splitIntervalAroundConverter = (interval: Interval, converter: Converter): Interval[] => {
    // début de l'interval dans le converter mais pas la fin
    if (interval.start >= converter.sourceStart && interval.end > converter.sourceEnd) {
        return [{ start: interval.start, end: converter.sourceEnd }, { start: converter.sourceEnd + 1, end: interval.end }]
    }
    // interval englobant le converter
    if (interval.start < converter.sourceStart && interval.end > converter.sourceEnd) {
        return [{ start: interval.start, end: converter.sourceStart - 1 }, { start: converter.sourceStart, end: converter.sourceEnd }, { start: converter.sourceEnd + 1, end: interval.end }]
    }
    // fin de l'interval dans le converter mais pas le début
    if (interval.start < converter.sourceStart && interval.end <= converter.sourceEnd) {
        return [{ start: interval.start, end: converter.sourceStart - 1 }, { start: converter.sourceStart, end: interval.end }]
    }
    // interval inclus dans le converter
    if (interval.start >= converter.sourceStart && interval.end <= converter.sourceEnd) {
        return [interval]
    }
    throw new Error('Impossible!')
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
    return allConverters.sort((a, b) => a.sourceStart - b.sourceStart).filter((item, index, arr) => JSON.stringify(arr.indexOf(item)) === JSON.stringify(index))
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
