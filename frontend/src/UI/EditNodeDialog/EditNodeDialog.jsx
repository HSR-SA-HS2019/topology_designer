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
          Text
        </label>
        <div className="col-sm-7">
          <input type="text" className="form-control" id="inpNodeLabel" />
        </div>
      </div>

{/*      <div className="form-group">
        <label htmlFor="inpLabelColor" className="col-sm-4 control-label">
          Text Color
        </label>
        <div className="col-sm-7">
          <input type="color" className="form-control" id="inpLabelColor" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="inpNodeColor" className="col-sm-4 control-label">
          Node Color
        </label>
        <div className="col-sm-7">
          <input type="color" className="form-control" id="inpNodeColor" />
        </div>
      </div>*/}

      <div className="form-group">
        <div className="col-sm-12">
          <button type="button" className="btn btn-success" id="btnSave">
            OK
          </button>

          <button type="button" className="btn btn-default" id="btnCancel">
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
);

export default EditNodeDialog;
