import { readFile } from '../../utils/getDataFile.js'
import { parseGraph, exploreGraphWithSeveralStart } from './graphService.js';

export const solve = (): number => {
    const [header, , ...graphStr]: string[] = readFile(8, 1);

    const instructions: string[] = header.split('')
    const graph: Graph = parseGraph(graphStr)

    //const starts : GraphPath[] = Object.keys(graph).filter(key => key.endsWith('A')).map(key => ({start: key, end: key.slice(0,key.lastIndexOf('A'))+'Z' }))
    //const starts: GraphPath[] = [{start:'AAA', end:'ZZZ'}]
    
    const starts : string[] = Object.keys(graph).filter(key => key.endsWith('A'))
    // const starts = ['VKA']
    console.log(JSON.stringify({paths: starts}))
    return exploreGraphWithSeveralStart(instructions, graph, starts)
}