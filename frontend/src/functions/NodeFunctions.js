export function addNode(nodes, url) {


}

export function requiredNode(nodesCopy, fromIndex, toIndex) {
    if (nodesCopy[fromIndex].group !== "virtual_network_devices") {
        return nodesCopy[fromIndex];
    } else {
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

export function hideNodeButtons() {
    document.getElementById("editNodeButton").disabled = true;
    document.getElementById("editNodeButton").style.display = "none";
    document.getElementById("deleteButton").disabled = true;
    document.getElementById("deleteButton").style.display = "none";
}