export const COLORS: Color[] = ['red', 'green', 'blue']
const HEADER_PREFIX = 'Game '

export const lineToGame = (line: string): Game => {
    const [lineheader, gameSets] = line.split(':');
    const game: Game = {
        id: getGameIdFromLineHeader(lineheader),
        sets: stringGameSetsToGameSetList(gameSets),
    }
    return game
}

const getGameIdFromLineHeader = (lineHeader: string): number => {
    return Number.parseInt(lineHeader.replace(HEADER_PREFIX, ''));
}

const stringGameSetsToGameSetList = (stringGameSets: string): GameSet[] => {
    const gameSets: string[] = stringGameSets.split(';');
    return gameSets.map(stringGameSetToGameSet);
}

const stringGameSetToGameSet = (stringGameSet: string): GameSet => {
    const gameSetComponents: string[] = stringGameSet.split(',');
    const gameSet: GameSet = gameSetComponents.reduce((acc: Partial<GameSet>, current: string) => {
        const currentColor = getColorFromString(current)
        acc[current] = getQuantityOfColorFromString(currentColor, current)
        return { ...acc, [currentColor]: getQuantityOfColorFromString(currentColor, current) }
    }, {})
    return gameSet;
}

const getColorFromString = (text: string): Color => {
    for (const color of COLORS) {
        if (text.includes(color)) {
            return color as Color
        }
    }
    throw new Error('This string contains no legal color')
}

const getQuantityOfColorFromString = (color: Color, text: string): number => {
    return Number.parseInt(text.replace(color, ''));
}