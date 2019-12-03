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
        runConfigFrom: "",
        runConfigTo: "",
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

export function saveEdgeConfig(edgesCopy, edgeIndex, nodesCopy, nodeIndex) {
    edgesCopy[edgeIndex].label = document.getElementById('inpEdgeLabel').value;
    nodesCopy[nodeIndex].label = document.getElementById('deviceNameFrom').value;
    nodesCopy[nodeIndex].type = document.getElementById('deviceTypeFrom').value;
    edgesCopy[edgeIndex].ipAddress = document.getElementById('ipAddressFrom').value;
    edgesCopy[edgeIndex].gateway = document.getElementById('gatewayFrom').value;
}

export function intializeEdgeConfig(edgesCopy, edgeIndex, nodeToConfig) {
    document.getElementById('inpEdgeLabel').value = edgesCopy[edgeIndex].label;
    document.getElementById('deviceNameFrom').value = nodeToConfig.label;
    document.getElementById('deviceTypeFrom').value = nodeToConfig.type;
    document.getElementById('ipAddressFrom').value = edgesCopy[edgeIndex].ipAddress;
    document.getElementById('gatewayFrom').value = edgesCopy[edgeIndex].gateway;
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


/*

/!**
 * Displays dialog with form for editing selected edge.
 *!/
export function showEditEdgeDialog(edgeData, callback) {
    console.log(edgeData);
    let runConfigFrom = edgeData.runConfigFrom;
    let runConfigTo = edgeData.runConfigTo;
    document.getElementById('inpEdgeLabel').value = edgeData.label;
    document.getElementById('runConfigFrom').value = runConfigFrom;
    document.getElementById('runConfigTo').value = runConfigTo;
    document.getElementById('btnSaveEdge').onclick = saveEdge.bind(this, edgeData, document, callback);
    document.getElementById('btnCancelEdgeEdit').onclick = cancelEdgeEdit.bind(this, document, callback);
    document.getElementById('editEdgeDialog').style.display = 'block';
}

/!**
 * Sets inputed data to the selected edge, saves the edge and hides the Edge Edit dialog.
 *!/
function saveEdge(edgeData, document, callback) {
    let newRunConfigFrom = document.getElementById('runConfigFrom').value;
    let newRunConfigTo = document.getElementById('runConfigTo').value;
    // edgeData.label = document.getElementById('inpEdgeLabel').value;
    edgeData.label = document.getElementById('inpEdgeLabel').value;
    edgeData.runConfigFrom = newRunConfigFrom;
    edgeData.runConfigTo = newRunConfigTo;
    console.log(edgeData);
    clearEditEdgeDialog(document);
    callback(edgeData);
}

/!**
 * Cancels editing of edge and hides Edit Edge dialog.
 *!/
function cancelEdgeEdit(document, callback) {
    clearEditEdgeDialog(document);
    callback(null);
}

/!**
 * Clears and hides Edit Edge dialog.
 *!/
function clearEditEdgeDialog(document) {
    document.getElementById('btnSaveEdge').onclick = null;
    document.getElementById('btnCancelEdgeEdit').onclick = null;
    document.getElementById('editEdgeDialog').style.display = 'none';
}
*/
