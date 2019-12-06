import GraphVis from 'react-graph-vis';
import React from 'react';
import {graphVisLocales, palette} from '../functions/GlobalConstants';
import EditNodeDialog from '../UI/EditNodeDialog/EditNodeDialog';
import EditEdgeDialog from '../UI/EditEdgeDialog/EditEdgeDialog';
import {exportTopology, importTopology, readFileAsync} from '../functions/YamlFileFunctions';
import {
    activateEdgeButtons,
    addEdge,
    closeEditDialogEdge,
    getSelectedEdge,
    saveEdgeConfig,
    showInitializeEdgeDialog
} from '../functions/EdgeFunctions';
import {closeDeleteTopologyDialog, deleteItem, updatePorts} from "../functions/DeleteAndUpdateFunctions";
import './SingleDrawing.css';
import axios from "axios";
import logo from '../Logo.png';
import {
    activateNodeButtons,
    addNode,
    closeNodeDialog,
    initializeNodeConfig,
    requiredId,
    requiredNode,
    saveNodeConfig
} from "../functions/NodeFunctions";
import yamljs from "yamljs";
import {activateDeleteButton, hideAllButtons, hideEditButtons, initializeButtons} from "../functions/GlobalFunctions";
import DeleteTopologyDialog from "../UI/DeleteTopologyDialog/DeleteTopologyDialog";

class SingleDrawing extends React.Component {
    deviceInfosUrl = "http://127.0.0.1:8000/api/";
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
                    size: 30,
                    shadow: {
                        enabled: false,
                        color: '#2D6480',
                        size: 10,
                        x: 0,
                        y: 0
                    },
                    chosen: {
                        node: function (values) {
                            values.shadow = {
                                enabled: true,
                            };
                        },
                    }
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
                        return width * 3;
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
                        gravitationalConstant: -10000,
                        centralGravity: 0.01,
                        springLength: 140,
                        springConstant: 0.1,
                        damping: 0.3
                    }
                },
                configure: false,       // Turn configuration panel off
            },
            events: {
                selectEdge: () => {
                    let {fromIndex, toIndex} = getSelectedEdge(this.network.getSelection().edges[0], this.state.graphVis.edges.slice(), this.state.graphVis.nodes.slice());
                    if (this.network.getSelection().edges.length === 1 && this.network.getSelection().nodes.length === 0 && (this.state.graphVis.nodes[fromIndex].group !== "virtual_network_devices" || this.state.graphVis.nodes[toIndex].group !== "virtual_network_devices")) {
                        activateEdgeButtons();
                    }
                    activateDeleteButton();
                },

                deselectEdge: () => {
                    hideAllButtons();
                },

                selectNode: () => {
                    let nodeId = this.network.getSelection().nodes[0];
                    let nodeIndex = this.state.graphVis.nodes.findIndex(x => x.id === nodeId);
                    if (this.network.getSelection().nodes.length === 1 && this.state.graphVis.nodes[nodeIndex].group === "virtual_network_devices") {
                        activateNodeButtons();
                    }
                    activateDeleteButton();
                },
                deselectNode: () => {
                    hideAllButtons();
                }
            },
            topology_name: 'topology designer',
            devices: []
        };
        this.exportTopologyHelper = this.exportTopologyHelper.bind(this);
        this.deleteTopology = this.deleteTopology.bind(this);
        this.newEdge = this.newEdge.bind(this);
        this.editEdge = this.editEdge.bind(this);
        this.createButtons = this.createButtons.bind(this);
        this.exportTopologyAsImage = this.exportTopologyAsImage.bind(this);
    }

    setNetworkInstance = nw => {
        this.network = nw;
        this.getDeviceInfos(this.deviceInfosUrl);
        this.network.on("afterDrawing", function (ctx) {
            let dataURL = ctx.canvas.toDataURL();
            document.getElementById('canvasImg').src = dataURL;
        });
    };

    deleteTopology = () => {
        document.getElementById("deleteTopologyDialog").style.display = "flex";
        document.getElementById('btnDeleteTopology').onclick = () => {
            this.clearNetworkState();
            closeDeleteTopologyDialog();
            hideEditButtons();
        };
        document.getElementById('btnCancelDeleteTopology').onclick = () => {
            closeDeleteTopologyDialog();
            hideEditButtons();
        };

    };

    deleteElement = () => {
        let deleteNodes = this.network.getSelection().nodes;
        let deleteEdges = this.network.getSelection().edges;
        let allNodes = this.state.graphVis.nodes.slice();
        let allEdges = this.state.graphVis.edges.slice();

        allEdges = updatePorts(deleteEdges, this.network.body.nodes, allEdges);
        let newNodes = deleteItem(allNodes, deleteNodes);
        let newEdges = deleteItem(allEdges, deleteEdges);

        hideEditButtons();

        this.setNetworkState(newNodes, newEdges);
    };

    exportTopologyHelper = () => {
        exportTopology(this.network.body.data.nodes._data, this.network.body.data.edges._data, this.state.topology_name)
    };

    exportTopologyAsImage = async () => {
        let filename = this.state.topology_name + '.png';
        let image = await document.getElementById("canvasImg");
        var link = document.createElement('a');
        link.setAttribute('href', image.src);
        link.setAttribute('download', filename);
        link.click();
    };

    readFile = () => {
        document.querySelector('input[type=file]').click();
    };

    readYaml = async () => {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            try {
                let file = document.querySelector('input[type=file]').files[0];
                let regex = /\.yaml/i;
                if (file.name.match(regex)) {
                    this.setState({graphVis: {nodes: [], edges: []}});
                    let contentBuffer = await readFileAsync(file);
                    let yamlString = yamljs.parse(contentBuffer);
                    let data = importTopology(yamlString, this.state.devices);
                    this.setState({topology_name: data.topology_name});
                    this.setState({graphVis: {nodes: data.nodes, edges: data.edges}});
                } else {
                    console.warn("Wrong Filetype: " + file.name);
                }
            } catch (e) {
                console.warn(e.message)
            }
        } else {
            console.warn("Your browser is too old to support HTML5 File API");
        }
    };

    getDeviceInfos = async (url) => {
        let res = await axios.get(url);   //local --> http://127.0.0.1:8000/api/1, server --> http://10.20.1.12:8000/api/1
        this.setState({devices: res.data});
        this.createButtons();
        this.initializeClickEvent();
    };

    createButtons = () => {
        this.state.devices.forEach(function (item) {
            initializeButtons(item);
        })
    };

    initializeClickEvent = () => {
        let self = this;
        this.state.devices.forEach(function (item) {
            let button = document.getElementById(item.defaultName);
            button.onclick = () => {
                self.addNewNode(item);
            };
        })
    };

    addNewNode(item) {
        let nodesCopy = this.state.graphVis.nodes.slice(); // this will create a copy with the same items
        let edgesCopy = this.state.graphVis.edges.slice();
        let nodes = addNode(item, nodesCopy);
        this.setState({graphVis: {nodes: nodes, edges: edgesCopy}});
    };

    newEdge = () => {
        let selection = this.network.getSelection();
        let edgesCopy = this.state.graphVis.edges.slice();
        let nodes = this.network.body.nodes;
        if (selection.nodes.length === 2) {
            let edges = addEdge(selection, edgesCopy, nodes);
            let nodesCopy = this.state.graphVis.nodes.slice();
            this.setNetworkState(nodesCopy, edges);
        }
    };

    editEdge = () => {
        hideAllButtons();
        let {edgesCopy, nodesCopy, edgeIndex, fromIndex, toIndex} = getSelectedEdge(this.network.getSelection().edges[0], this.state.graphVis.edges.slice(), this.state.graphVis.nodes.slice());
        let nodeToConfig = requiredNode(nodesCopy, fromIndex, toIndex);
        let nodeIndex = requiredId(nodeToConfig, fromIndex, toIndex);
        showInitializeEdgeDialog(nodeToConfig, nodeIndex, edgesCopy, edgeIndex);

        document.getElementById('btnSaveEdge').onclick = () => {
            let data = saveEdgeConfig(edgesCopy, edgeIndex, nodesCopy, nodeIndex);
            this.setNetworkState(data.nodesCopy, data.edgesCopy);
        };
        document.getElementById('btnCancelEdgeEdit').onclick = () => {
            closeEditDialogEdge();
        };
        document.getElementById('editEdgeDialog').style.display = 'block';
    };

    setNetworkState(nodesCopy, edgesCopy) {
        this.setState({graphVis: {nodes: nodesCopy, edges: edgesCopy}});
    }

    clearNetworkState() {
        this.setState({graphVis: {nodes: [], edges: []}});
    }

    editNode = () => {
        hideAllButtons();
        let edges = this.network.getSelection().edges;
        let currentId = this.network.getSelection().nodes[0];
        let nodesCopy = this.state.graphVis.nodes.slice();
        let edgesCopy = this.state.graphVis.edges.slice();
        let nodeIndex = nodesCopy.findIndex(x => x.id === currentId);
        initializeNodeConfig(nodesCopy, nodeIndex, currentId, edges, edgesCopy);
        document.getElementById('btnSaveNode').onclick = () => {
            saveNodeConfig(nodesCopy, nodeIndex);
            closeNodeDialog();
            hideEditButtons();
            this.setNetworkState(nodesCopy, edgesCopy);
        };
        document.getElementById('btnCancelNodeEdit').onclick = () => {
            closeNodeDialog();
            hideEditButtons();
        };
        document.getElementById('editNodeDialog').style.display = 'flex';
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
                <div className="iconBar" id="iconBar">
                    <span onClick={this.newEdge} id="addEdgeButton"><i className="fas fa-arrows-alt-h"/>Add Edge</span>
                    <span onClick={this.editEdge} className="editButton" id="editEdgeButton"> <i
                        className="fas fa-edit"/>Edit</span>
                    <span onClick={this.editNode} className="editButton" id="editNodeButton"> <i
                        className="fas fa-edit"/>Edit</span>
                    <span onClick={this.deleteElement} className="delete" id="deleteButton"> <i
                        className="fas fa-times"/>Delete</span>
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
                        <img id="canvasImg" crossOrigin="Anonymous" alt=""/>
                    </div>
                </div>
                <form className="nameForm">
                    <input type="text"
                           value={this.state.topology_name}
                           onChange={(event) => this.setState({topology_name: event.target.value})}/>
                </form>
                <img className="logo" src={logo} alt=""/>
                <EditNodeDialog/>
                <EditEdgeDialog/>
                <DeleteTopologyDialog/>

            </div>
        );
    }
}

export default SingleDrawing;
