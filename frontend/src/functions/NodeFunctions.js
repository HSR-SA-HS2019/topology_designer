export function addNode(nodes, url) {


}

export function requiredNode(nodesCopy, fromIndex, toIndex) {
    if (nodesCopy[fromIndex].group !== "virtual_network_devices") {
        return nodesCopy[fromIndex];
    } else {
        return nodesCopy[toIndex];
    }
}