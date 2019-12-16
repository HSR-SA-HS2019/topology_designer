import React from 'react';
import './DeleteTopologyDialog.css';

class DeleteTopologyDialog extends React.Component {
    render() {
        return (
            <div id="flexBox">
                <div id="deleteTopologyDialog">
                    <div id="labelWrapper">
                        <label htmlFor="deleteLabel" className="deleteLabel">
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
        )
    }
}

export default DeleteTopologyDialog;
