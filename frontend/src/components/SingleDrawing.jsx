import GraphVis from 'react-graph-vis';
import React from 'react';
import {graphVisLocales, palette} from '../functions/GlobalConstants';
import EditNodeDialog from '../UI/EditNodeDialog/EditNodeDialog';
import EditEdgeDialog from '../UI/EditEdgeDialog/EditEdgeDialog';
import {exportTopology} from '../functions/YamlFileFunctions';
import {addEdge} from '../functions/EdgeFunctions';
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
                nodes: {
                    font: {size: 18},
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
                    enabled: false,
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
                        gravitationalConstant: -2000,
                        centralGravity: 0.01,
                        springLength: 100,
                        springConstant: 0.1,
                        damping: 0.3
                    }
                },
                // Turn configuration panel off
                configure: false,
            },
            events: {
                selectEdge: () => {
                    if (this.network.getSelection().edges.length === 1 && this.network.getSelection().nodes.length === 0) {
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

    exportTopologyAsImage = () => {
        let filename = this.state.topology_name + '.png';
        let image = document.getElementById("canvasImg");
        let link = document.createElement('a');
        link.setAttribute('href', image.src);
        link.setAttribute('download', filename);
        link.click();
    };


    readFile = () => {
        document.querySelector('input[type=file]').click();
    };

    readYaml = () => {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // var preview = document.getElementById('show-text');


            var file = document.querySelector('input[type=file]').files[0];
            var reader = new FileReader();
            console.log(file);
            var regex = /\.yaml/i;

            if (file.name.match(regex)) {
                reader.onload = function (event) {
                    console.log(event.target.result);

                }
            } else {
                console.log("Wrong Filetype: " + file.type);
                // preview.innerHTML = "<span class='error'>It doesn't seem to be a YAML file!</span>";
            }
            reader.readAsText(file);

        } else {
            alert("Your browser is too old to support HTML5 File API");
        }
    };


    addNewNode(url) {
        axios.get(url)   //local --> http://127.0.0.1:8000/api/1, server --> http://10.20.1.12:8000/api/1
            .then(res => {
                let nodesCopy = this.state.graphVis.nodes.slice(); // this will create a copy with the same items
                let edgesCopy = this.state.graphVis.edges.slice();
                let number = 0;
                for (let n in nodesCopy) {
                    if (nodesCopy[n].group === res.data.name) {
                        number = number + 1;
                    }
                }
                nodesCopy.push({
                    label: res.data.defaultName + number,
                    group: res.data.name,
                    type: res.data.type,
                    image: res.data.icon,
                });
                this.setState({graphVis: {nodes: [], edges: []}});
                this.setState({graphVis: {nodes: nodesCopy, edges: edgesCopy}});
            });
    };

    newEdge = () => {
        let selection = this.network.getSelection();
        let edgesCopy = this.state.graphVis.edges.slice();
        if (selection.nodes.length === 2) {
            let edges = addEdge(selection, edgesCopy);
            let nodesCopy = this.state.graphVis.nodes.slice();
            this.setState({graphVis: {nodes: [], edges: []}});
            this.setState({graphVis: {nodes: nodesCopy, edges: edges}});
        }
    };

    editEdge = () => {
        let currentId = this.network.getSelection().edges[0];
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
        document.getElementById('inpNodeTypeFrom').value = nodesCopy[fromIndex].type;
        document.getElementById('inpNodeTypeTo').value = nodesCopy[toIndex].type;
        document.getElementById('runConfigFrom').value = edgesCopy[edgeIndex].runConfigFrom;
        document.getElementById('runConfigTo').value = edgesCopy[edgeIndex].runConfigTo;
        document.getElementById('btnSaveEdge').onclick = () => {
            edgesCopy[edgeIndex].label = document.getElementById('inpEdgeLabel').value;
            nodesCopy[fromIndex].label = document.getElementById('inpNodeLabelFrom').value;
            nodesCopy[toIndex].label = document.getElementById('inpNodeLabelTo').value;
            nodesCopy[fromIndex].type = document.getElementById('inpNodeTypeFrom').value;
            nodesCopy[toIndex].type = document.getElementById('inpNodeTypeTo').value;
            edgesCopy[edgeIndex].runConfigFrom = document.getElementById('runConfigFrom').value;
            edgesCopy[edgeIndex].runConfigTo = document.getElementById('runConfigTo').value;
            document.getElementById('btnSaveEdge').onclick = null;
            document.getElementById('btnCancelEdgeEdit').onclick = null;
            document.getElementById('editEdgeDialog').style.display = 'none';
            console.log(edgesCopy[edgeIndex].runConfigFrom.indexOf('\n'));
            console.log(edgesCopy[edgeIndex].runConfigTo.indexOf('\n'));
            this.setState({graphVis: {nodes: [], edges: []}});
            this.setState({graphVis: {nodes: nodesCopy, edges: edgesCopy}});
            //this.network.setData({nodes: nodesCopy, edges: edgesCopy});

        };
        document.getElementById('btnCancelEdgeEdit').onclick = () => {
            document.getElementById('btnSaveEdge').onclick = null;
            document.getElementById('btnCancelEdgeEdit').onclick = null;
            document.getElementById('editEdgeDialog').style.display = 'none';
        };
        document.getElementById('editEdgeDialog').style.display = 'block';
    };


    render() {
        return (
            <div className="single-drawing-box">
                <div className="drawingContent">
                    <GraphVis
                        graph={this.state.graphVis}
                        options={this.state.options}
                        events={this.state.events}
                        style={{height: "inherit"}}
                        getNetwork={this.setNetworkInstance}/>
                </div>
                <div className="icon-bar">
                    <span onClick={this.addNewNode.bind(this, this.docker_container_url)}><i className="fab fa-docker"/>Add Docker</span>
                    <span onClick={this.addNewNode.bind(this, this.virtual_network_devices_url)}><i
                        className="fas fa-random"/>Add Router</span>
                    <span onClick={this.newEdge}><i className="fas fa-arrows-alt-h"/>Add Edge</span>
                    <span onClick={this.editEdge} id="editButton"> <i className="fas fa-edit"/>Edit</span>
                    <span className="separator" onClick={this.exportTopologyHelper}><i className="fa fa-download"/>Export YAML</span>
                    <span onClick={this.exportTopologyAsImage}><i className="fa fa-picture-o"/>Export Image</span>
                    <span onClick={this.readFile}><i className="fa fa-upload"/>Import Yaml</span>
                    <span className="delete" onClick={this.deleteTopology}><i
                        className="fa fa-trash"/>Clear All</span>
                </div>
                <div className="Buttons">
                    <div> {/* handlebars? */}
                        <div>
                            <input type="file" className="filePicker" onChange={this.readYaml}/>
                        </div>
                        <img id="canvasImg" alt=""/>
                    </div>
                </div>
                <form className="nameForm">
                    Enter Topology Name:
                    <input type="text"
                           value={this.state.topology_name}
                           onChange={(event) => this.setState({topology_name: event.target.value})}/>
                </form>
                <img className="logo" src="../../../Logo.png" alt=""/>
                <EditNodeDialog/>
                <EditEdgeDialog/>
            </div>
        );
    }
}

export default SingleDrawing;
