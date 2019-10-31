import axios from "axios";

/**
 * Callback function for adding new node to GraphVis.
 */
export function addNode(nodeData, callback) {

    let labelInput = nodeData.label;
    if (labelInput === '   ')
        labelInput = '';

    document.getElementById('inpNodeLabel').value = labelInput;
    document.getElementById('btnSave').onclick = saveNode.bind(this, nodeData, document, callback);
    document.getElementById('btnCancel').onclick = cancelNodeEdit.bind(this, document, callback);
    document.getElementById('editNodeDialog').style.display = 'block';

    // Set parameters of the new node
    axios.get('http://10.20.1.12:8000/api/1')   //local --> http://127.0.0.1:8000/api/1, server --> http://10.20.1.12:8000/api/1
        .then(res => {
            nodeData.label = res.data.name;
            console.log(res.data.name);
            nodeData.shape = 'square';
            nodeData.margin = 16;
            //nodeData.label = '   ';
            nodeData.color = {background: 'white', border: '#000000'};
            nodeData.borderWidth = 1;
            nodeData.shadow = {enabled: false};
            callback(nodeData);
        });

}


/**
 * Displays dialog with form for editing selected node.
 */
export function showEditNodeDialog(nodeData, callback) {
    // Fill node edit dialog's inputs by selected node data
    //var nodesCopy = this.state.graphVis.nodes.slice();
    //this.state.graphVis.nodes.
    let labelInput = nodeData.label;
    if (labelInput === '   ')
        labelInput = '';

    document.getElementById('inpNodeLabel').value = labelInput;
    document.getElementById('btnSave').onclick = saveNode.bind(this, nodeData, document, callback);
    document.getElementById('btnCancel').onclick = cancelNodeEdit.bind(this, document, callback);
    document.getElementById('editNodeDialog').style.display = 'block';
}

/**
 * Sets inputed data to the selected node, saves the node and hides the Node Edit dialog.
 */
function saveNode(nodeData, document, callback) {
    let newLabel = document.getElementById('inpNodeLabel').value;
    if (newLabel.length === 1)
        newLabel = ' ' + newLabel + ' ';

    if (newLabel === '')
        newLabel = '   ';

    nodeData.label = newLabel;
    clearEditNodeDialog(document);
    callback(nodeData);
}

/**
 * Cancels editing of node and hides Edit Node dialog.
 */
function cancelNodeEdit(document, callback) {
    clearEditNodeDialog(document);
    callback(null);
}

/**
 * Clears and hides Edit Node dialog.
 */
function clearEditNodeDialog(document) {
    document.getElementById('btnSave').onclick = null;
    document.getElementById('btnCancel').onclick = null;
    document.getElementById('editNodeDialog').style.display = 'none';
}
