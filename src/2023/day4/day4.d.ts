interface Ticket {
    winningNumbers: number[],
    actualNumbers: number[],
}

interface QuantifiedTicket {quantity:number, ticket: Ticket}