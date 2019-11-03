import GraphVis from 'react-graph-vis';
import React from 'react';
import {graphVisLocales, palette} from '../functions/GlobalConstants';
import {addNode, showEditNodeDialog} from '../functions/NodeFunctions';
import {addEdge, showEditEdgeDialog} from '../functions/EdgeFunctions';
import EditNodeDialog from '../UI/EditNodeDialog/EditNodeDialog';
import EditEdgeDialog from '../UI/EditEdgeDialog/EditEdgeDialog';
import './SingleDrawing.css';

class SingleDrawing extends React.Component {
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
                },
                edges: {
                    arrows: {
                        to: {enabled: true,
                            type: "circle",
                            scaleFactor: 0.5},
                        from: {enabled: true,
                            type: "circle",
                            scaleFactor: 0.5},
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
                // Turn automatic graph rearranging off
                physics: true,
                // Turn configuration panel off
                configure: true,

            },
            topology_name: 'topology designer',
        };
        const network = null;
        this.initNetworkInstance = this.initNetworkInstance.bind(this);
        this.network_nodes = [];
        this.network_edges = [];
        this.network_devices = [];
        this.exportTopology = this.exportTopology.bind(this);
        this.deleteTopology = this.deleteTopology.bind(this);
        this.addNewNode = this.addNewNode.bind(this);
    }


    initNetworkInstance(networkInstance) {
        this.network = networkInstance;
    }

    setNetworkInstance = nw => {
        this.network = nw;
    };


    deleteTopology = () => {
        this.network.setData(null, null);
    };

    exportTopology = () => {
        this.network_nodes = [];
        this.network_edges = [];
        this.network_devices = [];

        for (var key in this.network.body.data.nodes._data) {
            if (this.network.body.data.nodes._data.hasOwnProperty(key)) {
                this.network_nodes.push([this.network.body.data.nodes._data[key].id,
                                        this.network.body.data.nodes._data[key].label,
                                        this.network.body.data.nodes._data[key].color.title,
                                        this.network.body.data.nodes._data[key].color.group,
                                        1]);
                if(!this.network_devices.includes(this.network.body.data.nodes._data[key].color.group)){
                    this.network_devices.push(this.network.body.data.nodes._data[key].color.group);
                }
                //console.log(key + " label: " + this.network.body.data.nodes._data[key].label);
            }
        }
        for (var key in this.network.body.data.edges._data) {
            if (this.network.body.data.edges._data.hasOwnProperty(key)) {
                this.network_edges.push(this.network.body.data.edges._data[key]);
                // console.log(key + " from: " + this.network.body.data.edges._data[key].from);
                // console.log(key + " to: " + this.network.body.data.edges._data[key].to);
                // console.log(key + " label: " + this.network.body.data.edges._data[key].label);
            }
        }
        console.log(this.network_nodes);
        console.log(this.network_edges);
        console.log(this.network_devices);
        console.log("---\n description: " + this.state.topology_name);
        for (var i in this.network_devices){
            console.log(this.network_devices[i]);
            for (var j in this.network_nodes){
                if(this.network_nodes[j][3] == this.network_devices[i]){
                    console.log("\t" + this.network_nodes[j][1] + ":");
                    console.log("\t\ttype: " + this.network_nodes[j][2]);
                }
            }
        }
        console.log("connections:")
        for (var i in this.network_edges){
            for (var j in this.network_nodes){
                if (this.network_edges[i].from == this.network_nodes[j][0]){
                    console.log("\t-\t" + this.network_nodes[j][1] + ": " + this.network_nodes[j][4]);
                    this.network_nodes[j][4] = this.network_nodes[j][4] + 1;
                }
            }
            for (var j in this.network_nodes){
                if (this.network_edges[i].to == this.network_nodes[j][0]){
                    console.log("\t\t" + this.network_nodes[j][1] + ": " + this.network_nodes[j][4]);
                    this.network_nodes[j][4] = this.network_nodes[j][4] + 1;
                }
            }
        }

    };

    addNewNode() {
        var nodesCopy = this.state.graphVis.nodes.slice(); // this will create a copy with the same items
        nodesCopy.push({label: 'Router',
            shape: "square",
            color: {
                group: 'virtual_network_devices',
                title: 'blub',
                background: 'white',
                border: '#000000',
            },

            borderWidth: 1});
        this.setState({ graphVis: {nodes: nodesCopy}});
    }



    render() {
        return (
            <div className="single-drawing-box">
                <div>
                    <form>
                        Enter Topology Name:
                        <input type="text"
                            value={this.state.topology_name}
                            onChange={(event) => this.setState({topology_name: event.target.value})}
                        />
                    </form>
                    <EditNodeDialog/>
                    <EditEdgeDialog/>
                    <button onClick={this.addNewNode}>Add Node</button>
                    <GraphVis
                        graph={this.state.graphVis}
                        options={this.state.options}
                        events={{}}
                        style={{width: "100%", height: '500px'}}
                        getNetwork={this.setNetworkInstance}/>
                </div>
                <div>
                    <div> {/* handlebars? */}
                        <button onClick={this.deleteTopology}>
                            Delete Topology
                        </button>
                        <button onClick={this.exportTopology}>
                            Export Topology
                        </button>
                    </div>
                </div>
            </div>

        );
    }
}

export default SingleDrawing;
