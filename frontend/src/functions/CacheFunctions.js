
export function cacheTopologyName(name) {
    localStorage.removeItem('myName');
    localStorage.setItem('myName', name);
}

export function cacheAllData(nodes, edges, name) {
    localStorage.clear();
    let nodesLength = nodes.length;
    let edgesLength = edges.length;
    localStorage.setItem('nodesLength', nodesLength);
    localStorage.setItem('edgesLength', edgesLength);

    localStorage.setItem('myName', name);

    for (let n in nodes){
        if (nodes.hasOwnProperty(n)){
            localStorage.setItem('myNode' + n, JSON.stringify(nodes[n]));
        }
    }

    for (let e in edges){
        if (edges.hasOwnProperty(e)){
            localStorage.setItem('myEdge' + e, JSON.stringify(edges[e]));
        }
    }
}

export function loadCache() {
    let name = localStorage.getItem('myName');
    if (name === null){
        name = 'topology designer';
    }
    let nodesLength = parseInt(localStorage.getItem('nodesLength'), 10);
    let edgesLength = parseInt(localStorage.getItem('edgesLength'), 10);
    let iterator = 0;
    let nodes = [];
    let edges = [];
    while (iterator < nodesLength) {
        nodes.push(JSON.parse(localStorage.getItem('myNode' + iterator)));
        iterator++;
    }
    iterator = 0;
    while (iterator < edgesLength) {
        edges.push(JSON.parse(localStorage.getItem('myEdge' + iterator)));
        iterator++;
    }
    return {nodes, edges, name};
}