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
                nodes: {font: {size: 18},},
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
                    addEdge: addEdge,
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
            topology_name: 'topology designer',
        };
        this.initNetworkInstance = this.initNetworkInstance.bind(this);
        this.exportTopologyHelper = this.exportTopologyHelper.bind(this);
        this.deleteTopology = this.deleteTopology.bind(this);
        this.addNewNode = this.addNewNode.bind(this);
    }

    initNetworkInstance(networkInstance) {
        this.network = networkInstance;
    }

    setNetworkInstance = nw => {
        this.network = nw;
        // // this.network.on("afterDrawing", function (ctx) {
        // //     let dataURL = ctx.canvas.toDataURL();
        // //     document.getElementById('canvasImg').src = dataURL;
        // });

    };

    deleteTopology = () => {
        this.setState({graphVis: {nodes: [], edegs: [],}})
    };

    exportTopologyHelper = () => {
        exportTopology(this.network.body.data.nodes._data, this.network.body.data.edges._data, this.state.topology_name)
    };


    exportTopologyAsImage = () => {
        let filename = this.state.topology_name + '.png';
        var image = document.getElementById("canvasImg");
        var link = document.createElement('a');
        link.setAttribute('href', image.src);
        link.setAttribute('download', filename);
        link.click();
    };

    addNewNode(url) {
        axios.get(url)   //local --> http://127.0.0.1:8000/api/1, server --> http://10.20.1.12:8000/api/1
            .then(res => {
                var nodesCopy = this.state.graphVis.nodes.slice(); // this will create a copy with the same items
                nodesCopy.push({
                    label: res.data.defaultName,
                    group: res.data.name,
                    type: res.data.type,
                    shape: "circularImage",
                    image: res.data.icon,
                    borderWidth: 1,
                    runConfig: ""
                });
                this.setState({graphVis: {nodes: nodesCopy}});
            });
    };


    log_State = () => {
        console.log(this.state);
    };

    log_Network = () => {
        console.log(this.network)
    };

    render() {
        return (
            <div className="single-drawing-box">
                <div className="drawingContent">
                    <EditNodeDialog/>
                    <EditEdgeDialog/>
                    <GraphVis
                        graph={this.state.graphVis}
                        options={this.state.options}
                        events={{}}
                        style={{width: "100%", height: '100%'}}
                        getNetwork={this.setNetworkInstance}/>
                </div>
                <div className="icon-bar">
                    <span><i className="fas fa-server"/></span>
                    <span onClick={this.addNewNode.bind(this, this.docker_container_url)}><i className="fab fa-docker"/></span>
                    <span onClick={this.addNewNode.bind(this, this.virtual_network_devices_url)}><i
                        className="fas fa-random"/></span>
                    <span onClick={this.exportTopologyHelper}><i className="fa fa-download"/></span>
                    <span onClick={this.exportTopologyAsImage}><i className="fa fa-picture-o"/></span>
                    <span className="delete" onClick={this.deleteTopology}><i className="fa fa-trash"/></span>
                </div>
                <div className="Buttons">
                    <div> {/* handlebars? */}
                        <button onClick={this.log_State}>
                            Log State
                        </button>
                        <button onClick={this.log_Network}>
                            Log Network
                        </button>
                        <img id="canvasImg" alt=""/>
                    </div>
                </div>
                <form className="nameForm">
                    Enter Topology Name:
                    <input type="text"
                           value={this.state.topology_name}
                           onChange={(event) => this.setState({topology_name: event.target.value})}/>
                </form>
            </div>

        );
    }
}

export default SingleDrawing;
