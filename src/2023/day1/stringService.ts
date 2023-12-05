export const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
export const FULL_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']


export const getFirstElementInString = (elements: string[], text: string): string => {
    // Position de chaque element dans le texte (l'index de la position correspond à l'index dans elements)
    const elementIndexes = elements.map(n => text.indexOf(n))
    //  Position de la valeur la plus basse dans elementIndexes (la position du premier élément dans le texte)
    const minIndexIndex = elementIndexes.indexOf(elementIndexes.filter(n => n>=0).sort((a, b) => a - b)[0])
    const firstElement = elements[minIndexIndex]
    return firstElement;
}

export const getLastElementInString = (elements: string[], text: string): string => {
    // Position de chaque element dans le texte (l'index de la position correspond à l'index dans elements)
    const elementIndexes = elements.map(n => text.lastIndexOf(n))
    //  Position de la valeur la plus haute dans elementIndexes (la position du premier élément dans le texte)
    const maxIndexIndex = elementIndexes.indexOf(elementIndexes.filter(n => n>=0).sort((a, b) => b - a)[0])
    const lastElement = elements[maxIndexIndex]
    return lastElement;
}

export const toNumberString = (textNumber: string): string => {
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(textNumber)) {
        return textNumber;
    }
    if ('one' === textNumber) return '1';
    if ('two' === textNumber) return '2';
    if ('three' === textNumber) return '3';
    if ('four' === textNumber) return '4';
    if ('five' === textNumber) return '5';
    if ('six' === textNumber) return '6';
    if ('seven' === textNumber) return '7';
    if ('eight' === textNumber) return '8';
    if ('nine' === textNumber) return '9';
throw new Error('not a number: ' + textNumber)
}