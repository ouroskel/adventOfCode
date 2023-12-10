type CardName = '1'|'2'|'3'|'4'|'5'|'6'|'8'|'7'|'9'|'T'|'J'|'Q'|'K'|'A'

interface Card {
    name: CardName,
    value: number
}

interface Hand {
    cards: Card[],
    value: number
}
