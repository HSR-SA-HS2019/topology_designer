import React from 'react';
import './EditEdgeDialog.css';

const EditEdgeDialog = () => (
    <div id="editEdgeDialog">
        <div className="operationName">
            Edit Edge
        </div>

        <form className="form-horizontal">
            <div className="form-group">
                <label htmlFor="inpEdgeLabel" className="col-sm-4 control-label">
                    Text
                </label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" id="inpEdgeLabel"/>
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
