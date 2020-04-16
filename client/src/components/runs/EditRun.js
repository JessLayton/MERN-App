import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from 'react-bootstrap/Button';
import Navbar from '../layout/Navbar';
import axios from 'axios';

export default class EditRun extends Component {
  constructor(props) {
    super(props);

    this.state = {
      distance: 0,
      time: 0,
      location: '',
      date: new Date(),
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/runs/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          distance: response.data.distance,
          time: response.data.time,
          location: response.data.location,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
    }

  onChangeDistance =(e) => {
    this.setState({
      distance: e.target.value
    });
  }

  onChangeTime = (e) => {
    this.setState({
      time: e.target.value
    });
  }

  onChangeLocation = (e) => {
    this.setState({
      location: e.target.value
    });
  }

  onChangeDate = (date) => {
    this.setState({
      date: date
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const run = {
      distance: this.state.distance,
      time: this.state.time,
      location: this.state.location,
      date: this.state.date,
    };

    console.log(run);

    axios.post('http://localhost:5000/api/runs/update/'+this.props.match.params.id, run)
      .then(res => console.log(res.data));
    
    window.location = '/';
  }

  render() {
    return (
      <div>
        <Navbar/>
        <h3 className="title-heading">Edit Run Log</h3>
        <form className="form" onSubmit={this.onSubmit}>
        
          <div className="form-group"> 
            <label>Distance (in Kilometres): </label>
            <input  type="text"
                className="form-control"
                value={this.state.distance}
                onChange={this.onChangeDistance}
                />
          </div>
          <div className="form-group">
            <label>Time (in minutes): </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.time}
                onChange={this.onChangeTime}
                />
          </div>
          <div className="form-group">
            <label>Location: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.location}
                onChange={this.onChangeLocation}
                />
          </div>
          <div className="form-group">
            
               <MuiPickersUtilsProvider utils={DateFnsUtils}>
               <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date"
          format="dd/MM/yyyy"
          value={this.state.date}
          onChange={this.onChangeDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
               </MuiPickersUtilsProvider>
             
            </div>

          <div className="form-group">
            <input type="submit" value="Edit Run Log" className="btn btn-primary" />
          </div>
          <div>
          <Button href="/">Back</Button>
          </div>
        </form>
      </div>
    )
  }
}