export const parseSequence = (str: string): number[] => {
    return str.split(' ').map(num => Number.parseInt(num))
}

export const getNextInSequence = (sequence: number[]): number => {
    if (sequence.every(value => value === 0)) {
        return 0
    }
    const lastValue = sequence[sequence.length - 1]
    const nextInSequence = lastValue + getNextInSequence(getSubSequence(sequence))
    return nextInSequence
}

export const getPreviousInSequence = (sequence: number[]): number => {
    if (sequence.every(value => value === 0)) {
        return 0
    }
    const firstValue = sequence[0]
    const previousInSequence = firstValue - getPreviousInSequence(getSubSequence(sequence))
    return previousInSequence
}

const getSubSequence = (sequence: number[]): number[] => {
    const subSequence: number[] = []
    for (let i = 0; i < sequence.length - 1; i++) {
        const element = sequence[i];
        const nextElement = sequence[i + 1]
        subSequence.push(nextElement - element)
    }
    return subSequence
}