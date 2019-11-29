import React from 'react';
import './DeleteTopologyDialog.css';

const DeleteTopologyDialog = () => (
    <div id="flexBox">
        <div id="deleteTopologyDialog">
            <div className="connectionNameWrapper">
                <label htmlFor="inpEdgeLabel" className="col-sm-4 control-label">
                    Are you sure, you want to delete the entire topology?
                </label>

            </div>

            <div className="button-form">

                <button type="button" className="btn btn-success" id="btnDeleteTopology">
                    OK
                </button>

                <button type="button" className="btn btn-default" id="btnCancelDeleteTopology">
                    Cancel
                </button>

            </div>
        </div>
    </div>
);

export default DeleteTopologyDialog;
