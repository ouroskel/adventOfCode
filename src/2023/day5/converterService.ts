const filterConverter = (valueToConvert: number, converter: Converter) : boolean => {
    return valueToConvert >= converter.sourceStart && valueToConvert<= converter.sourceEnd
}

export const convertValue = (value: number, converter: Converter) => {
    if(converter === undefined) return value
    const offset = value - converter.sourceStart
    return converter.targetStart + offset
}

export const findSeedLocation = (seed: number, converters: Converters[]): number => {
    return converters.reduce((acc, currentConverters) => {
        const validConverter = currentConverters.converters.find((converter) => filterConverter(acc, converter))!
        return convertValue(acc, validConverter)
    }, seed)
}