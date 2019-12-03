
export function deleteItem(originalArray, deleteArray){
    for (let n1 in deleteArray) {
        for (let n2 in originalArray){
            if(deleteArray[n1] === originalArray[n2].id){
                originalArray.splice(n2, 1);
            }
        }
    }
    return originalArray;
}


export function updatePorts(deletedEdges, nodes, allEdges) {
    for (let e1 in deletedEdges){
        for (let e2 in allEdges){
            if (deletedEdges[e1] === allEdges[e2].id){
                for (let n in nodes){
                    if (nodes.hasOwnProperty(n)){
                        if (allEdges[e2].from === nodes[n].id){
                            let portLimitFrom = allEdges[e2].portFrom;
                            allEdges = updatePortNumbersEdges(portLimitFrom, allEdges, nodes[n].id)
                        }
                        if (allEdges[e2].to === nodes[n].id){
                            let portLimitTo = allEdges[e2].portTo;
                            allEdges = updatePortNumbersEdges(portLimitTo, allEdges, nodes[n].id)
                        }
                    }

                }
            }
        }
    }
    return allEdges;
}

function updatePortNumbersEdges(portLimit, edges, nodeId) {
    for (let e in edges) {
        if (edges[e].from === nodeId) {
            if (edges[e].portFrom > portLimit) {
                edges[e].portFrom--;
            }
        }
        if (edges[e].to === nodeId) {
            if (edges[e].portTo > portLimit) {
                edges[e].portTo--;
            }
        }
    }
    return edges;
}

export function closeDeleteTopologyDialog() {
    document.getElementById('btnCancelDeleteTopology').onclick = null;
    document.getElementById('btnDeleteTopology').onclick = null;
    document.getElementById('deleteTopologyDialog').style.display = 'none';
}