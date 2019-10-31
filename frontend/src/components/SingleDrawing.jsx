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
                    addNode: addNode,
                    editNode: showEditNodeDialog,
                    addEdge: addEdge,
                    editEdge: showEditEdgeDialog,
                    exportTopology: addEdge,
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

    /*
      componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/1')
            .then(res => {
              this.setState({
                options:{
                  nodes:{
                    label: res.data.name
                  }
                }
              });
              console.log(res.data.name)
            })
      };*/


    initNetworkInstance(networkInstance) {
        this.network = networkInstance;
    }

    setNetworkInstance = nw => {
        this.network = nw;
    };


    DeleteTopology = () => {
        this.network.setData(null, null);
    };

    exportTopology = () => {

        console.log(this.network.nodes)
    };


    render() {
        return (
            <div className="single-drawing-box">
                <div>
                    <EditNodeDialog/>
                    <EditEdgeDialog/>
                    <GraphVis
                        graph={this.state.graphVis}
                        options={this.state.options}
                        events={{}}
                        style={{width: "100%", height: '750px'}}
                        getNetwork={this.setNetworkInstance}/>
                </div>
                <div>
                    <div>
                        <button onClick={() => this.DeleteTopology()}>
                            Delete Topology
                        </button>
                    </div>
                    <div>
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
