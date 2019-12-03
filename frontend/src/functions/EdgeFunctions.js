import {hideEditButtons} from "./GlobalFunctions";

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
        ipAddressFrom: "",
        gatewayFrom: "",
        ipAddressTo: "",
        gatewayTo: "",
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
    return {edgesCopy, nodesCopy, edgeIndex, fromIndex, toIndex};
}

export function closeEdgeDialog() {
    document.getElementById('btnSaveEdge').onclick = null;
    document.getElementById('btnCancelEdgeEdit').onclick = null;
    document.getElementById('editEdgeDialog').style.display = 'none';
}

export function saveEdgeFromConfig(edgesCopy, edgeIndex, nodesCopy, nodeIndex) {
    edgesCopy[edgeIndex].label = document.getElementById('inpEdgeLabel').value;
    nodesCopy[nodeIndex].label = document.getElementById('deviceNameFrom').value;
    nodesCopy[nodeIndex].type = document.getElementById('deviceTypeFrom').value;
    edgesCopy[edgeIndex].ipAddressFrom = document.getElementById('ipAddressFrom').value;
    edgesCopy[edgeIndex].gatewayFrom = document.getElementById('gatewayFrom').value;
}

export function saveEdgeToConfig(edgesCopy, edgeIndex, nodesCopy, nodeIndex) {
    edgesCopy[edgeIndex].label = document.getElementById('inpEdgeLabel').value;
    nodesCopy[nodeIndex].label = document.getElementById('deviceNameFrom').value;
    nodesCopy[nodeIndex].type = document.getElementById('deviceTypeFrom').value;
    edgesCopy[edgeIndex].ipAddressTo = document.getElementById('ipAddressFrom').value;
    edgesCopy[edgeIndex].gatewayTo = document.getElementById('gatewayFrom').value;
}

export function saveEdgeTwoConfig(edgesCopy, edgeIndex, nodesCopy, nodeIndexFrom, nodeIndexTo) {
    edgesCopy[edgeIndex].label = document.getElementById('inpEdgeLabel').value;
    nodesCopy[nodeIndexFrom].label = document.getElementById('deviceNameFrom').value;
    nodesCopy[nodeIndexFrom].type = document.getElementById('deviceTypeFrom').value;
    nodesCopy[nodeIndexTo].label = document.getElementById('deviceNameTo').value;
    nodesCopy[nodeIndexTo].type = document.getElementById('deviceTypeTo').value;
    edgesCopy[edgeIndex].ipAddressFrom = document.getElementById('ipAddressFrom').value;
    edgesCopy[edgeIndex].gatewayFrom = document.getElementById('gatewayFrom').value;
    edgesCopy[edgeIndex].ipAddressTo = document.getElementById('ipAddressTo').value;
    edgesCopy[edgeIndex].gatewayTo = document.getElementById('gatewayTo').value;
}

export function initializeEdgeFromConfig(edgesCopy, edgeIndex, nodeToConfig) {
    document.getElementById('inpEdgeLabel').value = edgesCopy[edgeIndex].label;
    document.getElementById('deviceNameFrom').value = nodeToConfig[0].label;
    document.getElementById('deviceTypeFrom').value = nodeToConfig[0].type;
    document.getElementById('ipAddressFrom').value = edgesCopy[edgeIndex].ipAddressFrom;
    document.getElementById('gatewayFrom').value = edgesCopy[edgeIndex].gatewayFrom;
}

export function initializeEdgeToConfig(edgesCopy, edgeIndex, nodeToConfig) {
    document.getElementById('inpEdgeLabel').value = edgesCopy[edgeIndex].label;
    document.getElementById('deviceNameFrom').value = nodeToConfig[1].label;
    document.getElementById('deviceTypeFrom').value = nodeToConfig[1].type;
    document.getElementById('ipAddressFrom').value = edgesCopy[edgeIndex].ipAddressTo;
    document.getElementById('gatewayFrom').value = edgesCopy[edgeIndex].gatewayTo;
}

export function initializeEdgeTwoConfig(edgesCopy, edgeIndex, nodeToConfig) {
    document.getElementById('inpEdgeLabel').value = edgesCopy[edgeIndex].label;
    document.getElementById('deviceNameFrom').value = nodeToConfig[0].label;
    document.getElementById('deviceTypeFrom').value = nodeToConfig[0].type;
    document.getElementById('deviceNameTo').value = nodeToConfig[1].label;
    document.getElementById('deviceTypeTo').value = nodeToConfig[1].type;
    document.getElementById('ipAddressFrom').value = edgesCopy[edgeIndex].ipAddressFrom;
    document.getElementById('gatewayFrom').value = edgesCopy[edgeIndex].gatewayFrom;
    document.getElementById('ipAddressTo').value = edgesCopy[edgeIndex].ipAddressTo;
    document.getElementById('gatewayTo').value = edgesCopy[edgeIndex].gatewayTo;
}

export function showInitializeEdgeDialog(nodeToConfig, nodeIndex, edgesCopy, edgeIndex) {
    if (nodeToConfig[0] === 0) { //to
        initializeEdgeToConfig(edgesCopy, edgeIndex, nodeToConfig);
    } else if (nodeToConfig[1] === 0) {   //from
        initializeEdgeFromConfig(edgesCopy, edgeIndex, nodeToConfig);
    } else {
        initializeEdgeTwoConfig(edgesCopy, edgeIndex, nodeToConfig);
    }
}

export function saveEdgeConfig(edgesCopy, edgeIndex, nodesCopy, nodeIndex) {
    if (nodeIndex[0] === 0) {
        saveEdgeToConfig(edgesCopy, edgeIndex, nodesCopy, nodeIndex[1]);
    } else if (nodeIndex[1] === 0) {
        saveEdgeFromConfig(edgesCopy, edgeIndex, nodesCopy, nodeIndex[0]);
    } else {
        saveEdgeTwoConfig(edgesCopy, edgeIndex, nodesCopy, nodeIndex[0], nodeIndex[1]);
    }
    closeEditDialogEdge();
    return {nodesCopy, edgesCopy};
}

export function closeEditDialogEdge() {
    closeEdgeDialog();
    hideEditButtons();
}
