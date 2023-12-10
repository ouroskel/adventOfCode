import {calculateHandValue, parseLine} from './cardsService.js'


describe('calculateHandValue',() => {
    it('should be ok five of a kind A', () => {
        //given
        const hand = 'AAAAA 1'
        const parsed = parseLine(hand)

        //when
        const handValue = calculateHandValue(parsed)

        //then
        expect(handValue).toBe(71414141414)
    })

    it('should be ok five of a kind K', () => {
        //given
        const hand = 'KKKKK 1'
        const parsed = parseLine(hand)

        //when
        const handValue = calculateHandValue(parsed)

        //then
        expect(handValue).toBe(71313131313)
    })

    it('should be ok five of a kind 1', () => {
        //given
        const hand = '11111 1'
        const parsed = parseLine(hand)

        //when
        const handValue = calculateHandValue(parsed)

        //then
        expect(handValue).toBe(70101010101)
    })

    
    it('should be ok fullhouse A3', () => {
        //given
        const hand = '33AAA 1'
        const parsed = parseLine(hand)

        //when
        const handValue = calculateHandValue(parsed)

        //then
        expect(handValue).toBe(50303141414)
    })

    it('should be ok fullhouse A3', () => {
        //given
        const hand = '3AA3A 1'
        const parsed = parseLine(hand)

        //when
        const handValue = calculateHandValue(parsed)

        //then
        expect(handValue).toBe(50314140314)
    })
})