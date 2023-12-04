import { readFile } from '../utils/getDataFile.js'
import { getValidNumbers, lineToTicket } from './ticketService.js';

export const solve = (): number => {
    const datas = readFile(4, 1);
    const tickets: Ticket[] = datas.map(lineToTicket)
    return tickets.map(calculateTicketValue).reduce((a, b) => a + b)
}


const calculateTicketValue = (ticket: Ticket) => {
    const validNumbers = getValidNumbers(ticket.winningNumbers, ticket.actualNumbers);
    return validNumbers.length === 0 ? 0 : Math.pow(2, validNumbers.length - 1)
}
