import React, { Component } from "react";
import "../assets/css/Currency.css";
import c3 from "c3";

class Currency extends Component {
  render() {
    return (
      <div className="small-card column block">
        <p className="is-size-5-mobile has-text-weight-bold">{this.props.symbol}</p>
        <p className="is-size-5-mobile">{this.props.currency}</p>
      </div>
    );
  }

  componentDidMount() {
    this.generateChart();
  }

  generateChart() {
    c3.generate({
      bindto: "#mainChart",
      data: {
        columns: [["data1", 20, 50, 80, 98]],
        type: "area-spline",
        colors: {
          data1: "#2B5876",
        },
      },
      point: {
        r: 3,
      },
    });
  }
}

export default Currency;
