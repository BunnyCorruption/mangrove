import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import DateAndTimePickers from './dateTimePicker';
import Button from '@material-ui/core/Button';
import './selectResults.css';
import InputsTable from './inputsTable.js';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'

const styles = theme => ({
  root: {
    padding: 19,
    marginTop: theme.spacing.unit * 3,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  }
});

class FilterSpecs extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    console.log(this.props)
  }
  render() {
    const { classes } = this.props;

    return (
      <div className="row">
        <div className="col-4">
          <Paper className={classes.root}>
            <h5>Filter By Index Specifications</h5>
            <form className={classes.root} autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="indexSelect">Index</InputLabel>
                  <Select
                    value={this.props.index}
                    onChange={this.props.handleIndexChange}
                    inputProps={{
                      name: 'index',
                      id: 'indexSelect',
                    }}
                  >
                  <MenuItem value='aci'>ACI</MenuItem>
                  <MenuItem value='ndsi'>NDSI</MenuItem>
                  <MenuItem value='adi'>ADI</MenuItem>
                  <MenuItem value='aei'>AEI</MenuItem>
                  <MenuItem value='bi'>BIO</MenuItem>
                  <MenuItem value='rms'>RMS</MenuItem>
                </Select>
              </FormControl>
            </form>
          </Paper>
        </div>
        <div className="col-8">
          {/* <InputsTable updateSelectedInputs={this.props.updateSelectedInputs} filteredInputs={this.props.filteredInputs}/> */}
        </div>
      </div>
    );
  }
}

FilterSpecs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterSpecs);