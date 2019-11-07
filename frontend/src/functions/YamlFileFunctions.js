

export function exportTopology(nodes, edges, name){
    let network_nodes = [];
    let network_edges = [];
    let network_devices = [];
    let StringData = '';
    let filename = name + '.yaml';

    for (let key1 in nodes) {
        if (nodes.hasOwnProperty(key1)) {
            network_nodes.push([nodes[key1].id,
                nodes[key1].label,
                nodes[key1].type,
                nodes[key1].group,
                1]);
            if(!network_devices.includes(nodes[key1].group)){
                network_devices.push(nodes[key1].group);
            }
        }
    }
    for (let key2 in edges) {
        if (edges.hasOwnProperty(key2)) {
            network_edges.push(edges[key2]);
        }
    }

    StringData = StringData + "---\ndescription: " + name;
    for (let i in network_devices){
        StringData = StringData + "\n" + network_devices[i];
        for (let j in network_nodes){
            if(network_nodes[j][3] === network_devices[i]){
                StringData = StringData + "\n\t" + network_nodes[j][1] + ":";
                StringData = StringData + "\n\t\ttype: " + network_nodes[j][2];
            }
        }
    }
    StringData = StringData + "\nconnections:";
    for (let k in network_edges){
        for (let m in network_nodes){
            if (network_edges[k].from === network_nodes[m][0]){
                StringData = StringData + "\n\t-\t" + network_nodes[m][1] + ": " + network_nodes[m][4];
                network_nodes[m][4] = network_nodes[m][4] + 1;
            }
        }
        for (let n in network_nodes){
            if (network_edges[k].to === network_nodes[n][0]){
                StringData = StringData + "\n\t\t" + network_nodes[n][1] + ": " + network_nodes[n][4];
                network_nodes[n][4] = network_nodes[n][4] + 1;
            }
        }
    }
    console.log(StringData);

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(StringData));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}