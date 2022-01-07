import React, { Component } from "react";
import "../assets/css/Currency.css";
import c3 from "c3";

class Currency extends Component {
  render() {
    return (
      <div id={"currency_" + this.props.id} className="small-card column block">
        <p className="is-size-5-mobile has-text-weight-bold">
          {this.props.symbol}
        </p>
        <p className="is-size-5-mobile">{this.props.currency}</p>
        <div id={this.props.id} className="currencyChart"></div>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      currency: this.props.id,
    });

    this.generateChart();
  }

  generateChart() {
    c3.generate({
      bindto: "#" + this.props.id,
      data: {
        columns: [["data1", 25, 26, 24, 25, 23, 27]],
        type: "spline",
        colors: {
          data1: "#E1CF27",
        },
      },
      legend: {
        show: false,
      },
      tooltip: {
        show: false,
      },
      point: {
        show: false,
      },
      axis: {
        x: {
          show: false,
        },
        y: {
          show: false,
        },
      },
    });
  }
}

export default Currency;
