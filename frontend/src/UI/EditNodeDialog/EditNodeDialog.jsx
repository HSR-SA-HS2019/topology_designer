import React from 'react';
import './EditNodeDialog.css';

const EditNodeDialog = () => (
    <div id="editNodeDialog">
        <div className="operationName">
            Edit Node
        </div>

        <form className="form-horizontal">
            <div className="form-group">
                <label htmlFor="inpNodeLabel" className="col-sm-4 control-label">
                    Devicename
                </label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" id="inpNodeLabel"/>
                </div>
                <label htmlFor="inpNodeLabel" className="col-sm-4 control-label">
                    Devicetype
                </label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" id="nodeDeviceType"/>
                </div>
                <label htmlFor="inpNodeLabel" className="col-sm-4 control-label">
                    Run Config
                </label>
                <div className="col-sm-7">
                    <textarea id="runConfig" name="text" rows="4"/>
                </div>
            </div>

            <div className="button-form">
                <div className="col-sm-12">
                    <button type="button" className="btn btn-success" id="btnSaveNode">
                        OK
                    </button>

                    <button type="button" className="btn btn-default" id="btnCancelNodeEdit">
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    </div>
);

export default EditNodeDialog;
