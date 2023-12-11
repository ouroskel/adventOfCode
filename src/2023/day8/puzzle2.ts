import { readFile } from '../../utils/getDataFile.js'
import { parseGraph, exploreGraphWithSeveralStart } from './graphService.js';

export const solve = (): number => {
    const [header, , ...graphStr]: string[] = readFile(8, 1);

    const instructions: string[] = header.split('')
    const graph: Graph = parseGraph(graphStr)

    const starts : string[] = Object.keys(graph).filter(key => key.endsWith('A'))
    return exploreGraphWithSeveralStart(instructions, graph, starts)
}