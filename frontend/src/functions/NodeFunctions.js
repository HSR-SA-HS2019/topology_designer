export function requiredNode(nodesCopy, fromIndex, toIndex) {
    function hideSecondDevice() {
        document.getElementById("secondDevice").style.display = "none";
    }

    if (nodesCopy[fromIndex].group !== "virtual_network_devices" && nodesCopy[toIndex].group !== "virtual_network_devices") {
        document.getElementById("secondDevice").style.display = "flex";
        return nodesCopy[toIndex];
    } else if (nodesCopy[fromIndex].group !== "virtual_network_devices") {
        hideSecondDevice();
        return nodesCopy[fromIndex];
    } else {
        hideSecondDevice();
        return nodesCopy[toIndex];
    }
}

export function requiredId(nodeToConfig, fromId, fromIndex, toIndex) {
    if (nodeToConfig.id === fromId) {
        return fromIndex
    } else {
        return toIndex
    }
}

export function getConnections(node, edges, allNodes, allEdges) {
    let portString = '';
    if (edges.length === 0) {
        return "No Connections"
    }
    for (let i in edges) {
        for (let j in allEdges) {
            if (edges[i] === allEdges[j].id) {
                if (node === allEdges[j].from) {
                    for (let k in allNodes) {
                        if (allNodes[k].id === allEdges[j].to) {
                            portString = portString + "Gi" + allEdges[j].portFrom + ": " + allNodes[k].label + "\n ";
                        }
                    }
                } else if (node === allEdges[j].to) {
                    for (let k in allNodes) {
                        if (allNodes[k].id === allEdges[j].from) {
                            portString = portString + "Gi" + allEdges[j].portTo + ": " + allNodes[k].label + "\n ";
                        }
                    }
                }
            }
        }
    }
    return portString;
}

export function activateNodeButtons() {
    document.getElementById("editNodeButton").disabled = false;
    document.getElementById("editNodeButton").style.display = "block";
    document.getElementById("editEdgeButton").disabled = true;
    document.getElementById("editEdgeButton").style.display = "none";
}

export function hideNodeButtons() {
    document.getElementById("editNodeButton").disabled = true;
    document.getElementById("editNodeButton").style.display = "none";
}

export function closeNodeDialog() {
    document.getElementById('btnSaveNode').onclick = null;
    document.getElementById('btnCancelNodeEdit').onclick = null;
    document.getElementById('editNodeDialog').style.display = 'none';
}