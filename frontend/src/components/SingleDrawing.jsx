import GraphVis from 'react-graph-vis';
import React from 'react';
import {graphVisLocales, palette} from '../functions/GlobalConstants';
import {showEditNodeDialog} from '../functions/NodeFunctions';
import {addEdge, showEditEdgeDialog} from '../functions/EdgeFunctions';
import EditNodeDialog from '../UI/EditNodeDialog/EditNodeDialog';
import EditEdgeDialog from '../UI/EditEdgeDialog/EditEdgeDialog';
import {exportTopology} from '../functions/YamlFileFunctions';
import './SingleDrawing.css';
import axios from "axios";

class SingleDrawing extends React.Component {
    virtual_network_devices_url = "http://127.0.0.1:8000/api/1";    //"http://10.20.1.12:8000/api/1";
    docker_container_url = "http://127.0.0.1:8000/api/2";   //"http://10.20.1.12:8000/api/2";

    constructor(props) {
        super(props);
        this.state = {
            graphVis: {nodes: [], edges: []},
            options: {
                autoResize: true,
                height: '100%',
                width: '100%',
                locale: 'en',
                locales: graphVisLocales,
                clickToUse: false,
                layout: {},
                nodes: {font: {size: 18},
                    borderWidth: 0,
                    shape: 'image',
                    size: 30
                },
                edges: {
                    arrows: {
                        to: {enabled: false},
                        from: {enabled: false},
                    },
                    color: {color: palette.black, hover: palette.black},
                    width: 2,
                    hoverWidth: function (width) {
                        return width * 2;
                    },
                    selectionWidth: function (width) {
                        return width * 2;
                    },
                    font: {align: 'top', size: 18},
                },
                manipulation: {
                    enabled: true,
                    initiallyActive: true,
                    addNode: false,
                    editNode: showEditNodeDialog,
                    addEdge: false,
                    editEdge: showEditEdgeDialog,
                    deleteNode: true,
                    deleteEdge: true,
                },
                interaction: {
                    dragNodes: true,
                    dragView: true,
                    // Use node hover colors when to mouse moves over it
                    hover: true,
                    // Longheld click or CTRT+click will add to the selection
                    multiselect: true,
                    selectable: true,
                },
                physics: {
                    barnesHut: {
                        gravitationalConstant: -10000,
                        centralGravity: 0.01,
                        springLength: 140,
                        springConstant: 0.1,
                        damping: 0.3,
                        avoidOverlap: 0.4
                    }
                },
                // Turn configuration panel off
                configure: false,
            },
            events: {
                selectEdge: () => {
                    if(this.network.getSelection().edges.length === 1 && this.network.getSelection().nodes.length === 0){
                        document.getElementById("editButton").disabled = false;
                    }

                },
                deselectEdge: () => {
                    document.getElementById("editButton").disabled = true;
                },
            },
            topology_name: 'topology designer',
        };
        this.initNetworkInstance = this.initNetworkInstance.bind(this);
        this.exportTopologyHelper = this.exportTopologyHelper.bind(this);
        this.deleteTopology = this.deleteTopology.bind(this);
        this.addNewNode = this.addNewNode.bind(this);
        this.newEdge = this.newEdge.bind(this);
        this.editEdge = this.editEdge.bind(this);
        this.redrawCanvas = this.redrawCanvas.bind(this);
    }

    initNetworkInstance(networkInstance) {
        this.network = networkInstance;
    }

    setNetworkInstance = nw => {
        this.network = nw;
    };

    deleteTopology = () => {
        this.setState({graphVis: {nodes: [], edges: [],}})
    };

    exportTopologyHelper = () => {
        exportTopology(this.network.body.data.nodes._data, this.network.body.data.edges._data, this.state.topology_name)
    };

    redrawCanvas = () => {
/*        let nodesCopy = this.state.graphVis.nodes.slice(); // this will create a copy with the same items
        console.log(nodesCopy);
        let edgesCopy = this.state.graphVis.edges.slice();
        console.log(edgesCopy);
        this.deleteTopology();
        console.log(nodesCopy);
        console.log(edgesCopy);
        this.setState({graphVis: {nodes: nodesCopy, edges: edgesCopy}});*/
    }

    exportTopologyAsImage = () => {
        let filename = this.state.topology_name + '.png';
        let image = document.getElementById("canvasImg");
        let link = document.createElement('a');
        link.setAttribute('href', image.src);
        link.setAttribute('download', filename);
        link.click();
    };

    addNewNode(url) {
        axios.get(url)   //local --> http://127.0.0.1:8000/api/1, server --> http://10.20.1.12:8000/api/1
            .then(res => {
                let nodesCopy = this.state.graphVis.nodes.slice(); // this will create a copy with the same items
                let edgesCopy = this.state.graphVis.edges.slice();
                nodesCopy.push({
                    label: res.data.defaultName,
                    group: res.data.name,
                    type: res.data.type,
                    image: res.data.icon,
                    runConfig: ""
                });
                this.setState({graphVis: {nodes: nodesCopy, edges: edgesCopy}});
            });
    };

    newEdge = () => {
        if(this.network.getSelection().nodes.length === 2){
            let nodesCopy = this.state.graphVis.nodes.slice();
            let selection = this.network.getSelection();
            let edgesCopy = this.state.graphVis.edges.slice();
            console.log(edgesCopy);
            edgesCopy.push({
                label: 'edge',
                from: selection.nodes[0],
                to: selection.nodes[1],
                runConfigFrom: "234",
                runConfigTo: "2143",
            });
            console.log(edgesCopy);
            this.setState({graphVis: {nodes: nodesCopy, edges: edgesCopy}});
        }

    };

    log_State = () => {
        console.log(this.state);
    };

    log_Network = () => {
        console.log(this.network.body.data.edges._data);
    };

    editEdge = () => {
        let currentId = this.network.getSelection().edges[0]
        let edgesCopy = this.state.graphVis.edges.slice();
        let nodesCopy = this.state.graphVis.nodes.slice();
        let edgeIndex = edgesCopy.findIndex(x => x.id === currentId);
        let fromId = edgesCopy[edgeIndex].from;
        let toId = edgesCopy[edgeIndex].to;
        let fromIndex = nodesCopy.findIndex(x => x.id === fromId);
        let toIndex = nodesCopy.findIndex(x => x.id === toId);

        document.getElementById('inpEdgeLabel').value = edgesCopy[edgeIndex].label;
        document.getElementById('inpNodeLabelFrom').value = nodesCopy[fromIndex].label;
        document.getElementById('inpNodeLabelTo').value = nodesCopy[toIndex].label;
        document.getElementById('runConfigFrom').value = edgesCopy[edgeIndex].runConfigFrom;
        document.getElementById('runConfigTo').value = edgesCopy[edgeIndex].runConfigTo;
        document.getElementById('btnSaveEdge').onclick = function saveEdge(){
            edgesCopy[edgeIndex].label = document.getElementById('inpEdgeLabel').value;
            nodesCopy[fromIndex].label = document.getElementById('inpNodeLabelFrom').value;
            nodesCopy[toIndex].label = document.getElementById('inpNodeLabelTo').value;
            edgesCopy[edgeIndex].runConfigFrom = document.getElementById('runConfigFrom').value;
            edgesCopy[edgeIndex].runConfigTo = document.getElementById('runConfigTo').value;
            document.getElementById('btnSaveEdge').onclick = null;
            document.getElementById('btnCancelEdgeEdit').onclick = null;
            document.getElementById('editEdgeDialog').style.display = 'none';
        };
        this.setState({graphVis: {nodes: nodesCopy, edges: edgesCopy}});
        document.getElementById('btnCancelEdgeEdit').onclick = function cancelEdgeEdit(){
            document.getElementById('btnSaveEdge').onclick = null;
            document.getElementById('btnCancelEdgeEdit').onclick = null;
            document.getElementById('editEdgeDialog').style.display = 'none';
        };
        document.getElementById('editEdgeDialog').style.display = 'block';
    };


    render() {
        return (
            <div className="single-drawing-box">
                <div>
                    <form>
                        Enter Topology Name:
                        <input type="text"
                               value={this.state.topology_name}
                               onChange={(event) => this.setState({topology_name: event.target.value})}/>
                    </form>
                    <EditNodeDialog/>
                    <EditEdgeDialog/>
                    <button onClick={this.addNewNode.bind(this, this.virtual_network_devices_url)}>Add Virtual Network
                        Device
                    </button>
                    <button onClick={this.addNewNode.bind(this, this.docker_container_url)}>Add Docker Container
                    </button>
                    <button onClick={this.newEdge}>Add Connection</button>
                    <button id="editButton" onClick={this.editEdge}>Edit</button>
                    <button onClick={this.redrawCanvas}>redraw</button>
                    <GraphVis
                        graph={this.state.graphVis}
                        options={this.state.options}
                        events={this.state.events}
                        style={{width: "100%", height: '600px'}}
                        getNetwork={this.setNetworkInstance}/>
                </div>
                <div>
                    <div> {/* handlebars? */}
                        <button onClick={this.deleteTopology}>
                            Delete Topology
                        </button>
                        <button onClick={this.exportTopologyHelper}>
                            Export Topology
                        </button>
                        <button onClick={this.exportTopologyAsImage}>
                            Export Topology as Image
                        </button>
                        <button onClick={this.log_State}>
                            Log State
                        </button>
                        <button onClick={this.log_Network}>
                            Log Network
                        </button>
                        <img id="canvasImg" alt=""/>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleDrawing;
