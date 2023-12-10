const CARDS: Card[] = [
    { name: '2', value: 2 },
    { name: '3', value: 3 },
    { name: '4', value: 4 },
    { name: '5', value: 5 },
    { name: '6', value: 6 },
    { name: '7', value: 7 },
    { name: '8', value: 8 },
    { name: '9', value: 9 },
    { name: 'T', value: 10 },
    { name: 'J', value: 11 },
    { name: 'Q', value: 12 },
    { name: 'K', value: 13 },
    { name: 'A', value: 14 }]

const COMBOS = {
    fiveOfAkind: 7,
    fourOfAKind: 6,
    fullHouse: 5,
    threeOfAKind: 4,
    twoPairs: 3,
    pair: 2,
    highCard: 1,
}
const mult = 100
const comboValue = 10000000000

export const parseLine = (line: string): Hand => {
    const [hand, value] = line.split(' ')
    return {
        cards: parseHand(hand),
        value: Number.parseInt(value)
    }
}

export const calculateHandValue = (hand: Hand) => {
    const combo = findCardsCombo(hand.cards)
    const value = combo * comboValue + hand.cards.reduce((acc, current) => {
        return mult * acc + current.value
    }, 0)
    return value
}

export const sortHandsByValue = (hands: Hand[]): Hand[] => {
    return hands.sort((a,b) => calculateHandValue(a) - calculateHandValue(b))
}

const parseCard = (card: string): Card => {
    return CARDS.find(c => c.name === card)!
}

const parseHand = (hand: string): Card[] => {
    return hand.split('').map(parseCard)
}


const findCardsCombo = (cards: Card[]) => {
    if (isXofAKind(cards, 5)) return COMBOS.fiveOfAkind;
    if (isXofAKind(cards, 4)) return COMBOS.fourOfAKind;
    if (isFullHouse(cards)) return COMBOS.fullHouse
    if (isXofAKind(cards, 3)) return COMBOS.threeOfAKind;
    if (isDoublePair(cards)) return COMBOS.twoPairs;
    if (isXofAKind(cards, 2)) return COMBOS.pair;
    return COMBOS.highCard;
}

const isXofAKind = (cards: Card[], x: number): boolean => {
    for (const card of cards) {
        if (cards.filter(c => c === card).length === x) {
            return true
        }
    }
    return false
}

const isFullHouse = ([first, ...rest]: Card[]): boolean => {
    const firstOption = rest.filter(card => card === first).length + 1
    const secondOption = rest.filter(c => c === rest.filter(card => card !== first)[0]).length
    return firstOption === 3 && secondOption === 2 || firstOption === 2 && secondOption == 3
}

const isDoublePair = (cards: Card[]): boolean => {
    return cards.map(card => cards.filter(c => c.name === card.name).length).filter(occ => occ === 2).length > 2
}