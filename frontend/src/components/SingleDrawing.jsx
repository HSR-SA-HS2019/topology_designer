import GraphVis from 'react-graph-vis';
import React from 'react';
import {graphVisLocales, palette} from '../functions/GlobalConstants';
import {showEditNodeDialog} from '../functions/NodeFunctions';
import {showEditEdgeDialog} from '../functions/EdgeFunctions';
import EditNodeDialog from '../UI/EditNodeDialog/EditNodeDialog';
import EditEdgeDialog from '../UI/EditEdgeDialog/EditEdgeDialog';
import './SingleDrawing.css';
import axios from "axios";

class SingleDrawing extends React.Component {
    routerurl = "http://10.20.1.12:8000/api/1";
    switchrurl = "http://10.20.1.12:8000/api/2";

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
                    addEdge: function (data, callback) {
                        console.log('add edge', data);

                        callback(data);
                    },
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
        };
        const network = null;
        this.initNetworkInstance = this.initNetworkInstance.bind(this);

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

        for (var key in this.network.body.data.nodes._data) {
            if (this.network.body.data.nodes._data.hasOwnProperty(key)) {
                console.log(key + " -> " + this.network.body.data.nodes._data[key].label);
            }
        }
        console.log(this.network.body.data.nodes._data);

        for (var i = 0; i < this.state.graphVis.nodes.length; i++) {
            console.log(this.state.graphVis.nodes[i].label);
        }

    };


    addNewNode(url) {
        axios.get(url)   //local --> http://127.0.0.1:8000/api/1, server --> http://10.20.1.12:8000/api/1
            .then(res => {
                var nodesCopy = this.state.graphVis.nodes.slice(); // this will create a copy with the same items
                nodesCopy.push({
                    label: res.data.name,
                    shape: "circle",
                    color: {
                        background: 'white',
                        border: '#000000',
                    },

                    borderWidth: 1
                });
                this.setState({graphVis: {nodes: nodesCopy}});
            });


    };


    addNewEdge(edgedata) {
        /*        console.log('add edge', edgedata);
                var edgesCopy = this.state.graphVis.edges;
                edgesCopy.push({label: "",
                    from: this.network.body.from,
                    to: this.network.body.to,
                })
                this.setState({grapgVis: {edges: edgesCopy}})*/
        console.log(edgedata);
        console.log(this.network.body.data.edges);

    };


    render() {
        return (
            <div className="single-drawing-box">
                <div>
                    <form>
                        Enter Topology Name:
                        <input type="text" name="firstname"/>
                    </form>
                    <EditNodeDialog/>
                    <EditEdgeDialog/>
                    <button onClick={this.addNewNode.bind(this, this.routerurl)}>Add Router</button>
                    <button onClick={this.addNewNode.bind(this, this.switchrurl)}>Add Switch</button>
                    <button onClick={this.addNewEdge.bind(this)}>Add Edge</button>
                    <GraphVis
                        graph={this.state.graphVis}
                        options={this.state.options}
                        events={{}}
                        style={{width: "100%", height: '750px'}}
                        getNetwork={this.setNetworkInstance}/>
                </div>
                <div>
                    <div> {/* handlebars? */}
                        <button onClick={() => this.deleteTopology()}>
                            Delete Topology
                        </button>
                        <button onClick={() => this.exportTopology()}>
                            Export Topology
                        </button>
                    </div>
                </div>
            </div>

        );
    }
}

export default SingleDrawing;
