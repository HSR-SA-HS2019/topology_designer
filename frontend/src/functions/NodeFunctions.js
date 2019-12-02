import {hideEditButtons} from "./GlobalFunctions";

export function addNode(item, nodesCopy) {
    let number = 0;
    for (let n in nodesCopy) {
        if (nodesCopy[n].group === item.name) {
            number = number + 1;
        }
    }
    nodesCopy.push({
        label: item.defaultName + number,
        group: item.name,
        type: item.type,
        image: item.icon,
        runConfig: ""
    });
    return nodesCopy;
}

export function requiredNode(nodesCopy, fromIndex, toIndex) {
    function hideSecondDevice() {
        document.getElementById("secondDevice").style.display = "none";
    }

    if (nodesCopy[fromIndex].group !== "virtual_network_devices" && nodesCopy[toIndex].group !== "virtual_network_devices") {
        document.getElementById("secondDevice").style.display = "flex";
        return [nodesCopy[fromIndex], nodesCopy[toIndex]];
    } else if (nodesCopy[fromIndex].group !== "virtual_network_devices") {
        hideSecondDevice();
        return [nodesCopy[fromIndex], 0];
    } else {
        hideSecondDevice();
        return [0, nodesCopy[toIndex]];
    }
}

export function requiredId(nodeToConfig, fromIndex, toIndex) {
    if (nodeToConfig[1] === 0) {
        return [fromIndex, 0];
    } else if (nodeToConfig[0] === 0){
        return [0, toIndex];
    }
    else {
        return [fromIndex, toIndex];
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

export function saveNodeConfig(nodesCopy, nodeIndex) {
    nodesCopy[nodeIndex].label = document.getElementById('inpNodeLabel').value;
    nodesCopy[nodeIndex].runConfig = document.getElementById('runConfig').value;
    nodesCopy[nodeIndex].type = document.getElementById('nodeDeviceType').value;
};

export function initializeNodeConfig(nodesCopy, nodeIndex, currentId, edges, edgesCopy) {
    document.getElementById('inpNodeLabel').value = nodesCopy[nodeIndex].label;
    document.getElementById('runConfig').value = nodesCopy[nodeIndex].runConfig;
    document.getElementById('nodeDeviceType').value = nodesCopy[nodeIndex].type;
    document.getElementById('connections').innerText = getConnections(currentId, edges, nodesCopy, edgesCopy);
};

export function closeEditDialogNode() {
    closeNodeDialog();
    hideEditButtons();
}