import { readFile } from '../../utils/getDataFile.js'
import { exploreGraph, parseGraph } from './graphService.js';

export const solve = (): number => {
    const [header, , ...graphStr]: string[] = readFile(8, 1);

    const instructions: string[] = header.split('')
    const graph = parseGraph(graphStr)
    return exploreGraph(instructions, graph, 'AAA', 'ZZZ')
}