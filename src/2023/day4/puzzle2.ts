import { readFile } from '../../utils/getDataFile.js'
import { getValidNumbers, lineToTicket } from './ticketService.js';

export const solve = (): number => {
    const datas = readFile(4, 2);
    const tickets: Ticket[] = datas.map(lineToTicket)
    const ticketsWithCopies = generateCopies(tickets.map(t => ({ quantity: 1, ticket: t })))
    return ticketsWithCopies.reduce((acc, current) => acc + current.quantity, 0)
}

const generateCopies = (tickets: QuantifiedTicket[]): QuantifiedTicket[] => {
    const [first, ...rest] = tickets
    return generateCopiesRec(first, rest)
}

const generateCopiesRec = (first: QuantifiedTicket, otherTickets: QuantifiedTicket[]): QuantifiedTicket[] => {
    if (otherTickets.length === 0) {
        return [first]
    } 
    const validNumbersQuantity = getValidNumbers(first.ticket.winningNumbers, first.ticket.actualNumbers).length
    for (let i = 0; i < validNumbersQuantity; i++) {
        otherTickets[i].quantity += first.quantity
    }
    const [newFirst, ...rest] = otherTickets
    return [first, ...generateCopiesRec(newFirst, rest)]
}