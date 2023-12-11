// // Correct i think but performance issue
// export const exploreGraphWithSeveralStart = (instructions: string[], graph: Graph, starts: string[]): number => {
//     let currentNodes = starts
//     console.log(JSON.stringify({currentNodes}))
//     let numberOfSteps = 0;
//     while (!currentNodes.every(node => node.endsWith('Z'))) {
//         for (let i = 0; i < instructions.length; i++) {
//             numberOfSteps++
//             currentNodes = currentNodes.map(node => getNextNode(instructions[i], node, graph))
//             if (currentNodes.every(node => node.endsWith('Z'))) break
//         }
//     }
//     return numberOfSteps
// }

export const exploreGraphWithSeveralStart = (instructions: string[], graph: Graph, starts: string[]): number => {
    const stepsNumber = starts.map(start => exploreGraphEndingWithZ(instructions, graph, start))
    return getLcm(stepsNumber)
}

const getGcd = (a:number, b:number): number => {
    if(b === 0 ){
        return a
    }
    return getGcd(b, a % b)
}

const getLcm = ([head, ...rest]: number[]): number => {
    console.log(JSON.stringify({rest, head}))
    if(rest.length === 0) return head
    const previous = getLcm(rest)
    console.log(previous)
    return  previous * head / getGcd(previous, head)
}

export const exploreGraphEndingWithZ = (instructions: string[], graph: Graph, start: string): number => {
    let currentNode = start
    let numberOfSteps = 0;
    while (!currentNode.endsWith('Z')) {
        for (let i = 0; i < instructions.length; i++) {
            numberOfSteps++
            currentNode = getNextNode(instructions[i], currentNode, graph)
            if (currentNode.endsWith('Z')) break
        }
    }
    console.log(numberOfSteps)
    return numberOfSteps
}




export const exploreGraph = (instructions: string[], graph: Graph, start: string, goal: string): number => {
    let currentNode = start
    let numberOfSteps = 0;
    while (currentNode !== goal) {
        for (let i = 0; i < instructions.length; i++) {
            numberOfSteps++
            currentNode = getNextNode(instructions[i], currentNode, graph)
            if (currentNode === goal) break
        }
    }
    return numberOfSteps
}

export const parseGraph = (graphNodes: string[]): Graph => {
    const graph = graphNodes.reduce(graphParsingReducer, {})
    return graph
}

const getNextNode = (instruction: string, currentNodeName: string, graph: Graph): string => {
    const currentNode = graph[currentNodeName]
    return instruction === 'L' ? currentNode.left : currentNode.right
}

const graphParsingReducer = (acc, nodeStr) => {
    const [name, node] = parseNode(nodeStr);
    acc[name] = node;
    return acc
}

const parseNode = (nodeStr: string): [string, GraphNode] => {
    const [name, content] = nodeStr.split('=')
    const [left, right] = content.replace('(', '').replace(')', '').split(',').map(str => str.trim())
    return [name.trim(), { left, right }]
}