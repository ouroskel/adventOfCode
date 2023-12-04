export const getValidNumbers = (winningNumbers: number[], actualNumbers: number[]): number[] => {
    return actualNumbers.filter(num => winningNumbers.includes(num))
}

export const lineToTicket = (line: string): Ticket => {
    const [, ticketNumbers] = line.split(':');
    const [winningNumbers, actualNumbers] = ticketNumbers.split('|');
    const ticket: Ticket = {
        winningNumbers: winningNumbers.split(' ').filter(s => !!s).map(num => Number.parseInt(num, 10)),
        actualNumbers: actualNumbers.split(' ').filter(s => !!s).map(num => Number.parseInt(num, 10))
    }
    return ticket
}