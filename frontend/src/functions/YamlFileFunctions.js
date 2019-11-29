export function exportTopology(nodes, edges, name){
    let network_nodes = [];
    let network_edges = [];
    let network_devices = [];
    let StringData = '';
    let filename = name + '.yaml';

    for (let key1 in nodes) {
        if (nodes.hasOwnProperty(key1)) {
            network_nodes.push({id: nodes[key1].id,
                label: nodes[key1].label,
                type: nodes[key1].type,
                group: nodes[key1].group,
                runConfig : nodes[key1].runConfig,
            });
            if(!network_devices.includes(nodes[key1].group)){
                network_devices.push(nodes[key1].group);
            }
        }
    }

    for (let key2 in edges) {
        if (edges.hasOwnProperty(key2)) {
            network_edges.push({id: edges[key2].id,
                to: edges[key2].to,
                from: edges[key2].from,
                ipAddress: edges[key2].ipAddress,
                gateway: edges[key2].gateway,
                portFrom: edges[key2].portFrom,
                portTo: edges[key2].portTo
            });
        }
    }

    StringData = StringData + "---\ndescription: " + name;
    for (let i in network_devices){
        StringData = StringData + "\n" + network_devices[i] + ":";
        for (let j in network_nodes){
            if(network_nodes[j].group === network_devices[i]){
                StringData = StringData + "\n\t" + network_nodes[j].label + ":";
                StringData = StringData + "\n\t\ttype: " + network_nodes[j].type;
            }
        }
    }

    StringData = StringData + "\nconnections:";
    for (let k in network_edges){
        for (let m in network_nodes){
            if (network_edges[k].from === network_nodes[m].id){
                StringData = StringData + "\n\t-\t" + network_nodes[m].label + ": " + network_edges[k].portFrom;
            }
            else if (network_edges[k].to === network_nodes[m].id){
                StringData = StringData + "\n\t\t" + network_nodes[m].label + ": " + network_edges[k].portTo;
            }
        }
    }

    StringData = StringData + "\n\nrunning_configs:\n";
    for (let l in network_nodes){
        if(network_nodes[l].group === "virtual_network_devices"){
            StringData = StringData + "\t" + network_nodes[l].label + ": |\n";
            let newRunConfigString = network_nodes[l].runConfig.replace(/\n/g, "\n\t\t\t");
            StringData = StringData + "\t\t\t" + newRunConfigString + "\n";
        }
        else {
            StringData = StringData + "\t" + network_nodes[l].label + ":\n";
            for (let n in network_edges){
                if (network_nodes[l].id === network_edges[n].from){
                    StringData = StringData + "\t\t- interface_number: " + network_edges[n].portFrom + "\n";
                    StringData = StringData + "\t\t\tipv4address: " + network_edges[n].ipAddress + "\n";
                    StringData = StringData + "\t\t\tgatewayv4: " + network_edges[n].gateway + "\n"
                }
                else if (network_nodes[l].id === network_edges[n].to){
                    StringData = StringData + "\t\t- interface_number: " + network_edges[n].portTo + "\n";
                    StringData = StringData + "\t\t\tipv4address: " + network_edges[n].ipAddress + "\n";
                    StringData = StringData + "\t\t\tgatewayv4: " + network_edges[n].gateway + "\n"
                }
            }
        }
    }

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(StringData));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

export function importTopologyName(data) {
    let topology_name = data.description;
    return topology_name;
}

export function importTopologyNodes(data) {
    let nodes = [];
    let virtual_network_devices = data.virtual_network_devices;    //Object
    let docker_containers = data.docker_containers;    //Object
    let virtual_machines = data.virual_machines;    //Object
    let runConfigs = data.running_configs;
    let idCounter = 0;

    if (!(virtual_network_devices === undefined)){
        for (let key1 in virtual_network_devices) {
            let runConfig = '';
            if (virtual_network_devices.hasOwnProperty(key1)) {
                for (let i in runConfigs){
                    if ( runConfigs.hasOwnProperty(i)){
                        if (key1 === i){
                            runConfig = runConfigs[i];
                        }
                    }
                }
                nodes.push({
                    id: idCounter,
                    shape: 'circle',
                    label: key1,
                    type: virtual_network_devices[key1].type,
                    group: 'virtual_network_devices',
                    runConfig: runConfig
                });
                idCounter++;
            }
        }
    }

    if (!(docker_containers === undefined)){
        for (let key2 in docker_containers) {
            if (docker_containers.hasOwnProperty(key2)) {
                nodes.push({
                    id: idCounter,
                    shape: 'circle',
                    label: key2,
                    type: docker_containers[key2].type,
                    group: 'docker_containers',
                    runConfig: ""
                });
                idCounter++;
            }
        }
    }

    if (!(virtual_machines === undefined)){
        for (let key3 in virtual_machines) {
            if (virtual_machines.hasOwnProperty(key3)) {
                nodes.push({
                    id: idCounter,
                    shape: 'circle',
                    label: key3,
                    type: virtual_machines[key3].type,
                    group: 'virtual_machines',
                    runConfig: ""
                });
                idCounter++;
            }
        }
    }
    return nodes;
}

export function importTopologyEdges(data, nodes) {
    let edges = [];
    let connections = data.connections; // Array

    if(connections.length !== 0){
        let portFrom = 0;
        let portTo = 0;
        let idFrom = 0;
        let idTo = 0;
        let idCounter = nodes.length;
        for (let i in connections){
            if (connections.hasOwnProperty(i)) {
                for (let j in nodes){
                    if (nodes.hasOwnProperty(j)){
                        if (Object.keys(connections[i])[0] === nodes[j].label){
                            portFrom = Object.values(connections[i])[0];
                            idFrom = nodes[j].id;
                        }
                        else if (Object.keys(connections[i])[1] === nodes[j].label){
                            portTo = Object.values(connections[i])[1];
                            idTo = nodes[j].id;
                        }
                    }
                }
                edges.push({
                    id: idCounter,
                    label: '',
                    from: idFrom,
                    to: idTo,
                    ipAddressFrom: '',
                    gatewayFrom: '',
                    ipAddressTo: '',
                    gatewayTo: '',
                    portFrom: portFrom,
                    portTo: portTo,
                });
                idCounter++;
            }
        }
    }
    return edges;
}

export function importTopologyRunConfigs(data, nodes, edges) {
    let runConfigs = data.running_configs;  //Object
    if (!(runConfigs === undefined)){
        for (let key4 in runConfigs) {
            if (runConfigs.hasOwnProperty(key4)) {
                for (let k in nodes){
                    if (nodes.hasOwnProperty(k)){
                        if (key4 === nodes[k].label){
                            if (nodes[k].group === "virtual_network_devices"){
                                nodes[k].runConfig = runConfigs[key4];
                            }
                            else {
                                for (let l in edges){
                                    if (edges.hasOwnProperty(l)){
                                        if (edges[l].from === nodes[k].id && edges[l].portFrom === runConfigs[key4][0].interface_number){ // prüfen ob node und interface number
                                            edges[l].ipAddress = runConfigs[key4][0].ipv4address;
                                            edges[l].gateway = runConfigs[key4][0].gatewayv4;
                                        }
                                        else if (edges[l].to === nodes[k].id && edges[l].portTo === runConfigs[key4][0].interface_number){
                                            edges[l].ipAddress = runConfigs[key4][0].ipv4address;
                                            edges[l].gateway = runConfigs[key4][0].gatewayv4;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return {nodes, edges};
}


export function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsText(file);
    })
}


export function importTopology(data){
    let nodes = [];
    let edges = [];
    let topology_name = data.description;
    let virtual_network_devices = data.virtual_network_devices;    //Object
    let docker_containers = data.docker_containers;    //Object
    let virtual_machines = data.virual_machines;    //Object
    let connections = data.connections; // Array
    let runConfigs = data.running_configs;  //Object
    let idCounter = 0;
    

    if (!(virtual_network_devices === undefined)){
        for (let key1 in virtual_network_devices) {
            if (virtual_network_devices.hasOwnProperty(key1)) {
                nodes.push({
                    id: idCounter,
                    label: key1,
                    type: virtual_network_devices[key1].type,
                    group: 'virtual_network_devices',
                    runConfig: "",
                    shape: 'circle'
                });
                idCounter++;
            }
        }
    }

    if (!(docker_containers === undefined)){
        for (let key2 in docker_containers) {
            if (docker_containers.hasOwnProperty(key2)) {
                nodes.push({
                    id: idCounter,
                    label: key2,
                    type: docker_containers[key2].type,
                    group: 'docker_containers',
                    runConfig: "",
                    shape: 'rectangle'
                });
                idCounter++;
            }
        }
    }

    if (!(virtual_machines === undefined)){
        for (let key3 in virtual_machines) {
            if (virtual_machines.hasOwnProperty(key3)) {
                nodes.push({
                    id: idCounter,
                    label: key3,
                    type: virtual_machines[key3].type,
                    group: 'virtual_machines',
                    runConfig: "",
                    shape: 'triangle'
                });
                idCounter++;
            }
        }
    }

    if(connections.length !== 0){
        let portFrom = 0;
        let portTo = 0;
        let idFrom = 0;
        let idTo = 0;
        for (let i in connections){
            if (connections.hasOwnProperty(i)) {
                for (let j in nodes){
                    if (nodes.hasOwnProperty(j)){
                        if (Object.keys(connections[i])[0] === nodes[j].label){
                            portFrom = Object.values(connections[i])[0];
                            idFrom = nodes[j].id;
                        }
                        else if (Object.keys(connections[i])[1] === nodes[j].label){
                            portTo = Object.values(connections[i])[1];
                            idTo = nodes[j].id;
                        }
                    }

                }
                edges.push({
                    id: idCounter,
                    label: '',
                    from: idFrom,
                    to: idTo,
                    ipAddressFrom: '',
                    gatewayFrom: '',
                    ipAddressTo: '',
                    gatewayTo: '',
                    portFrom: portFrom,
                    portTo: portTo,
                });
                idCounter++;
            }

        }
    }

    if (!(runConfigs === undefined)){
        for (let key4 in runConfigs) {
            if (runConfigs.hasOwnProperty(key4)) {
                for (let k in nodes){
                    if (nodes.hasOwnProperty(k)){
                        if (key4 === nodes[k].label){
                            if (nodes[k].group === "virtual_network_devices"){
                                nodes[k].runConfig = runConfigs[key4];
                            }
                            else {
                                for (let l in edges){
                                    if (edges.hasOwnProperty(l)){
                                        if (edges[l].from === nodes[k].id && edges[l].portFrom === runConfigs[key4][0].interface_number){ // prüfen ob node und interface number
                                            edges[l].ipAddressFrom = runConfigs[key4][0].ipv4address;
                                            edges[l].gatewayFrom = runConfigs[key4][0].gatewayv4;
                                        }
                                        else if (edges[l].to === nodes[k].id && edges[l].portTo === runConfigs[key4][0].interface_number){
                                            edges[l].ipAddressTo = runConfigs[key4][0].ipv4address;
                                            edges[l].gatewayTo = runConfigs[key4][0].gatewayv4;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return {topology_name, nodes, edges};
}