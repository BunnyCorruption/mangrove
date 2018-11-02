import React, { Component } from 'react';

class ChooseEvennessParams extends Component {
  render(props) {
    return (
      <form>
        <div className="form-group row">
          <label htmlFor="max-freq" className="col-2 col-form-label">Max Frequency</label>
          <div className="col-5">
            <input onChange={this.props.onChange} className="form-control" type="text" value={this.props.params['max-freq']} id="max-freq" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="db-threshold" className="col-2 col-form-label">Db Threshold</label>
          <div className="col-5">
            <input onChange={this.props.onChange} className="form-control" type="text" value={this.props.params['db-threshold']} id="db-threshold" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="freq-step" className="col-2 col-form-label">Freq Step</label>
          <div className="col-5">
            <input onChange={this.props.onChange} className="form-control" type="text" value={this.props.params['freq-step']} id="freq-step" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default ChooseEvennessParams;
