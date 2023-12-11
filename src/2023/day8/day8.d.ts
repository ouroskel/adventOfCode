interface GraphNode {
    left: string,
    right: string
}
interface Graph {
    [name: string] : GraphNode
}

interface GraphPath {
    start: string, 
    end: string
}