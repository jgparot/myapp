import React from "react";
import ReactDOM from "react-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

function f(timestamp) {


let unix_timestamp =  timestamp
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

console.log(formattedTime);
}


const columns = [
  {
    type: "number",
    label: "year"
  },
  {
    label: "AttentionSpan",
    type: "number"
  }
];
const rows = [[2015, 1025], [2016, 1023], [2018, 1021]];

class Charto extends React.Component {
    state = {rows: [[2015, 1025], [2016, 1023], [2018, 1021]]};


    componentDidUpdate(){
        console.log(this.props.data['AAPL'])
    }

  render() {
    return (
      <div className="App">
        <LineChart width={500} height={300} data={this.props.data['AAPL']}>
            {console.log(this.props.data['AAPL'], "aaa")};
    <XAxis dataKey="name"/>
    <YAxis/>

    <Line dataKey="value" />

  </LineChart>


      </div>
    );
  }
}

export default Charto;

console.log(f(1549312452));