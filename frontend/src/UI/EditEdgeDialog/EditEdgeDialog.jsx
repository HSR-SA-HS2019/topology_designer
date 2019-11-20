import React from 'react';
import './EditEdgeDialog.css';

const EditEdgeDialog = () => (
    <div id="editEdgeDialog">
        {/*<div className="operationName">
            Edit Edge
        </div>*/}

        <form className="form-horizontal">
            <div className="form-group">
                <div className="connectionNameWrapper">
                    <label htmlFor="inpEdgeLabel" className="col-sm-4 control-label">
                        Conncection Name
                    </label>
                    <div className="col-sm-7">
                        <input type="text" className="form-control" id="inpEdgeLabel"/>
                    </div>
                </div>
                <div className="configWrapper">
                    <div className="deviceOne">
                        <label htmlFor="Devicename" className="col-sm-4 control-label">
                            Devicename
                        </label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="inpNodeLabel"/>
                        </div>
                        <label htmlFor="inpEdgeLabel" className="col-sm-4 control-label">
                            Devicetype
                        </label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="inpNodeType"/>
                        </div>
                        <label htmlFor="inpEdgeIp" className="col-sm-4 control-label">
                            Ip Address
                        </label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="inpNodeIp"/>
                        </div>
                        <label htmlFor="inpEdgeGateway" className="col-sm-4 control-label">
                            Gateway
                        </label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="inpNodeGateway"/>
                        </div>

                    </div>
                </div>
            </div>

            <div className="button-group">

                <button type="button" className="btn btn-success" id="btnSaveEdge">
                    OK
                </button>

                <button type="button" className="btn btn-default" id="btnCancelEdgeEdit">
                    Cancel
                </button>

            </div>
        </form>
    </div>
);

export default EditEdgeDialog;
