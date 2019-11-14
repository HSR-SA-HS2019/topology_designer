import React from 'react';
import './EditEdgeDialog.css';

const EditEdgeDialog = () => (
    <div id="editEdgeDialog">
        {/*<div className="operationName">
            Edit Edge
        </div>*/}

        <form className="form-horizontal">
            <div className="form-group">
                <label htmlFor="inpEdgeLabel" className="col-sm-4 control-label">
                    Label Connection
                </label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" id="inpEdgeLabel"/>
                </div>

                <label htmlFor="inpEdgeLabel" className="col-sm-4 control-label">
                    Label Device
                </label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" id="inpNodeLabelFrom"/>
                </div>
                <label htmlFor="inpEdgeLabel" className="col-sm-4 control-label">
                    Type Device
                </label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" id="inpNodeTypeFrom"/>
                </div>
                <label htmlFor="inpNodeLabel" className="col-sm-4 control-label">
                    Run Config Device
                </label>
                <div className="col-sm-7">
                    <textarea id="runConfigFrom" name="text" rows="4"/>
                </div>

                <label htmlFor="inpEdgeLabel" className="col-sm-4 control-label">
                    Label Device
                </label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" id="inpNodeLabelTo"/>
                </div>
                <label htmlFor="inpEdgeLabel" className="col-sm-4 control-label">
                    Type Device
                </label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" id="inpNodeTypeTo"/>
                </div>
                <label htmlFor="inpNodeLabel" className="col-sm-4 control-label">
                    Run Config Device
                </label>
                <div className="col-sm-7">
                    <textarea id="runConfigTo" name="text" rows="4"/>
                </div>
            </div>

            <div className="form-group">
                <div className="col-sm-12">
                    <button type="button" className="btn btn-success" id="btnSaveEdge">
                        OK
                    </button>

                    <button type="button" className="btn btn-default" id="btnCancelEdgeEdit">
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    </div>
);

export default EditEdgeDialog;
