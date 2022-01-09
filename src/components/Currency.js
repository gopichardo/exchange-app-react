import React, { Component } from "react";
import "../assets/css/Currency.css";
import c3 from "c3";
import HistoryRate from "../logic/HistoryRate";

class Currency extends Component {

  render() {
    return (
      <div
        id={"currency_" + this.props.id}
        className={this.props.isActive ? "small-card currency-selected" : "small-card"}
        onClick={this.selectCurrency}>
        <p className="is-size-5-mobile has-text-weight-bold">
          {this.props.symbol.value}
        </p>
        <p className="is-size-5-mobile">{this.props.symbol.label}</p>
        <div id={this.props.id} className="currencyChart"></div>
      </div>
    );
  }

  componentDidMount() {
    this.bindChart();
  }

  bindChart = async () => {
    // await HistoryRate.getRateHistoryByDay();
    this.setState(
      {
        currency: this.props.id,
      },
      () => {
        this.generateChart();
      }
    );
  };

  generateChart = () => {
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

  selectCurrency = () => {
    this.props.onClick(this.props.symbol, this.props.index);
  }
}

export default Currency;
