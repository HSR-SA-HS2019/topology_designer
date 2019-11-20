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
    document.getElementById("deleteButton").disabled = true;
    document.getElementById("deleteButton").style.display = "none";
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
