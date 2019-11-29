/**
 * Function for adding new edge to GraphVis.
 */
export function addEdge(selection, edgesCopy, bodyNodes) {
    let elementFrom = 0;
    let elementTo = 0;
    for (let key1 in bodyNodes) {
        if (bodyNodes.hasOwnProperty(key1)) {
            if (bodyNodes[key1].id === selection.nodes[0]) {
                elementFrom = bodyNodes[key1].edges.length;
            } else if (bodyNodes[key1].id === selection.nodes[1]) {
                elementTo = bodyNodes[key1].edges.length;
            }
        }
    }
    edgesCopy.push({
        label: '',
        from: selection.nodes[0],
        to: selection.nodes[1],
        ipAddress: "",
        gateway: "",
        portFrom: elementFrom + 1,
        portTo: elementTo + 1,
    });
    return edgesCopy
}

export function hideEdgeButtons() {
    document.getElementById("editEdgeButton").disabled = true;
    document.getElementById("editEdgeButton").style.display = "none";
}

export function activateEdgeButtons() {
    document.getElementById("editEdgeButton").disabled = false;
    document.getElementById("editEdgeButton").style.display = "block";
    document.getElementById("editNodeButton").disabled = true;
    document.getElementById("editNodeButton").style.display = "none";
}

export function getSelectedEdge(currentId, edgesCopy, nodesCopy) {
    let edgeIndex = edgesCopy.findIndex(x => x.id === currentId);
    let fromId = edgesCopy[edgeIndex].from;
    let toId = edgesCopy[edgeIndex].to;
    let fromIndex = nodesCopy.findIndex(x => x.id === fromId);
    let toIndex = nodesCopy.findIndex(x => x.id === toId);
    return {edgesCopy, nodesCopy, edgeIndex, fromId, fromIndex, toIndex};
}

export function closeEdgeDialog() {
    document.getElementById('btnSaveEdge').onclick = null;
    document.getElementById('btnCancelEdgeEdit').onclick = null;
    document.getElementById('editEdgeDialog').style.display = 'none';
}


export function addImportEdge(data) {
    return {
        id: data.id,
        label: '',
        from: data.from,
        to: data.to,
        ipAddress: data.ipAddress,
        gateway: data.gateway,
        portFrom: data.portFrom,
        portTo: data.portTo,
    }
}
