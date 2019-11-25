
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
            /*StringData = StringData + "\t\thostname " + network_nodes[l].label+ "\n";
            let counter = 1;
            while(counter <= network_nodes[l].portCount){
                StringData = StringData + "\t\tinterface Gi" + counter + "\n";
                for(let y in network_edges){
                    if(network_edges[y].from === network_nodes[l].id && network_edges[y].portCountFrom === counter){
                        let newRunConfigFrom = network_edges[y].runConfigFrom.replace(/\n/g, "\n\t\t\t");
                        StringData = StringData + "\t\t\t" + newRunConfigFrom + "\n";
                    }
                    else if(network_edges[y].to === network_nodes[l].id && network_edges[y].portCountTo === counter){
                        let newRunConfigTo = network_edges[y].runConfigTo.replace(/\n/g, "\n\t\t\t");
                        StringData = StringData + "\t\t\t" + newRunConfigTo + "\n";
                    }
                }
                counter++;
            }*/

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
            /*if(network_nodes[l].portCount > 0){
                StringData = StringData + "\t" + network_nodes[l].label + ":\n";
                let counter = 1;
                while(counter <= network_nodes[l].portCount){
                    StringData = StringData + "\t\t- interface_number: " + counter + "\n";
                    for(let z in network_edges){
                        if(network_edges[z].from === network_nodes[l].id && network_edges[z].portCountFrom === counter){
                            let newRunConfigFrom = network_edges[z].runConfigFrom.replace(/\n/g, "\n\t\t\t");
                            StringData = StringData + "\t\t\t" + newRunConfigFrom + "\n";
                        }
                        else if(network_edges[z].to === network_nodes[l].id && network_edges[z].portCountTo === counter){
                            let newRunConfigTo = network_edges[z].runConfigTo.replace(/\n/g, "\n\t\t\t");
                            StringData = StringData + "\t\t\t" + newRunConfigTo + "\n";
                        }
                    }
                    counter++;
                }
            }*/

        }



    console.log(StringData);

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(StringData));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}