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
                physics: false,
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
        console.log("blub");

    };

    addNewNode() {
        var nodesCopy = this.state.graphVis.nodes.slice(); // this will create a copy with the same items
        nodesCopy.push({label: 'blub',
            shape: "circle",
            color: {
                background: 'white',
                border: '#000000',
            },

            borderWidth: 1});
        this.setState({ graphVis: {nodes: nodesCopy}});
    }

    addNewEdge (edgedata) {
/*        console.log('add edge', edgedata);
        var edgesCopy = this.state.graphVis.edges;
        edgesCopy.push({label: "",
            from: this.network.body.from,
            to: this.network.body.to,
        })
        this.setState({grapgVis: {edges: edgesCopy}})*/
        console.log(this.network.body.data.edges);

    };

    render() {
        return (
            <div className="single-drawing-box">
                <div>
                    <EditNodeDialog/>
                    <EditEdgeDialog/>
                    <button onClick={this.addNewNode.bind(this)}>Add Node</button>
                    <button onClick={this.addNewEdge.bind(this)}>Add Edge</button>
                    <GraphVis
                        graph={this.state.graphVis}
                        options={this.state.options}
                        events={{}}
                        style={{width: "100%", height: '500px'}}
                        getNetwork={this.setNetworkInstance}/>
                </div>
                <div>
                    <div>   /* buttons mit handlebars implementieren?*/
                        <button onClick={() => this.deleteTopology()}>
                            Delete Topology /* Button */
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
