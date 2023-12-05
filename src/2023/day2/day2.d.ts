interface Game {
    id: number, 
    sets: GameSet[]
}

type GameSet = {
    [color in Color]?: number
}

type Color = 'red' | 'green' | 'blue'