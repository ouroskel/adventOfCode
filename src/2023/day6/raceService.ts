export const getValidTimes = (race: Race): number[] => {
    const validTImes: number[] = []
    for (let t = 0; t < race.time; t++) {
        if (t * (race.time - t) >= race.distance) {
            validTImes.push(t);
        }
    }
    return validTImes
}