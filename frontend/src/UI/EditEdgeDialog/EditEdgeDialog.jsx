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
          <input type="text" className="form-control" id="inpEdgeLabel" />
        </div>
      </div>

{/*      <div className="form-group">
        <label htmlFor="inpEdgeColor" className="col-sm-4 control-label">
          Text Color
        </label>
        <div className="col-sm-7">
          <input type="color" className="form-control" id="inpEdgeColor" />
        </div>
      </div>*

      <div className="form-group">
        <label htmlFor="inpEdgeWidth" className="col-sm-4 control-label">
          Edge Width
        </label>
        <div className="col-sm-7">
          <input type="number" className="form-control" id="inpEdgeWidth" />
        </div>
      </div>*/}

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
