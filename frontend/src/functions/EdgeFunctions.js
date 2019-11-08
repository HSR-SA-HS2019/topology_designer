/**
 * Function for adding new edge to GraphVis.
 */
export function addEdge(edgeData, callback) {
    // Set new edge properties
    edgeData.label = '';
    edgeData.runConfigFrom = "234";
    edgeData.runConfigTo = "2143";
    callback(edgeData);
}

/**
 * Displays dialog with form for editing selected edge.
 */
export function showEditEdgeDialog(edgeData, callback) {
    let runConfigFrom = edgeData.runConfigFrom;
    let runConfigTo = edgeData.runConfigTo;
    document.getElementById('inpEdgeLabel').value = edgeData.label;
    document.getElementById('runConfigFrom').value = runConfigFrom;
    document.getElementById('runConfigTo').value = runConfigTo;
    document.getElementById('btnSaveEdge').onclick = saveEdge.bind(this, edgeData, document, callback);
    document.getElementById('btnCancelEdgeEdit').onclick = cancelEdgeEdit.bind(this, document, callback);
    document.getElementById('editEdgeDialog').style.display = 'block';
}

/**
 * Sets inputed data to the selected edge, saves the edge and hides the Edge Edit dialog.
 */
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

/**
 * Cancels editing of edge and hides Edit Edge dialog.
 */
function cancelEdgeEdit(document, callback) {
    clearEditEdgeDialog(document);
    callback(null);

}

/**
 * Clears and hides Edit Edge dialog.
 */
function clearEditEdgeDialog(document) {
    document.getElementById('btnSaveEdge').onclick = null;
    document.getElementById('btnCancelEdgeEdit').onclick = null;
    document.getElementById('editEdgeDialog').style.display = 'none';
}
