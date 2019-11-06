import axios from "axios";


/**
 * Displays dialog with form for editing selected node.
 */
export function addNewNode(url, existingNodes) {
    axios.get(url)   //local --> http://127.0.0.1:8000/api/1, server --> http://10.20.1.12:8000/api/1
        .then(res => {
            // this will create a copy with the same items

            existingNodes.push({
                label: res.data.name,
                title: res.data.type,
                group: res.data.name,
                shape: "circle",
                color: {
                    background: 'white',
                    border: '#000000',
                },

                borderWidth: 1,
                runConfig: ""
            });

            console.log(existingNodes)

        });
    return existingNodes;
}

export function showEditNodeDialog(nodeData, callback) {
    // Fill node edit dialog's inputs by selected node data
    //var nodesCopy = this.state.graphVis.nodes.slice();
    //this.state.graphVis.nodes.
    let labelInput = nodeData.label;
    if (labelInput === '   ')
        labelInput = '';

    let runConfig = nodeData.runConfig;

    document.getElementById('inpNodeLabel').value = labelInput;
    document.getElementById('runConfig').value = runConfig;
    document.getElementById('btnSave').onclick = saveNode.bind(this, nodeData, document, callback);
    document.getElementById('btnCancel').onclick = cancelNodeEdit.bind(this, document, callback);
    document.getElementById('editNodeDialog').style.display = 'block';
}

/**
 * Sets inputed data to the selected node, saves the node and hides the Node Edit dialog.
 */
function saveNode(nodeData, document, callback) {
    let newLabel = document.getElementById('inpNodeLabel').value;
    let newRunConfig = document.getElementById('runConfig').value;
    if (newLabel.length === 1)
        newLabel = ' ' + newLabel + ' ';

    if (newLabel === '')
        newLabel = '   ';

    nodeData.label = newLabel;
    nodeData.runConfig = newRunConfig;
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
