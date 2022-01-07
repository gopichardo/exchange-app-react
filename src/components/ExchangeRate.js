import React, { Component } from "react";
import Select from "react-select";
import "../assets/css/ExchangeRate.css";
import "../assets/css/c3.min.css";
import c3 from "c3";
import Currency from "../components/Currency";

class EchangeRate extends Component {
  state = {
    symbols: this.getSymbols(),
    defaultSymbol: { value: "MXN", label: "Mexican Peso" },
  };

  constructor(props) {
    super(props);
    this.options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
    ];
  }

  render() {
    return (
      <div className="column">
        <h1 className="title is-size-4-mobile">
          Summary of <b>{this.state.defaultSymbol.label}</b> exchange rates
          against other currencies.
        </h1>
        <div className="has-text-centered block">
          <label
            htmlFor="sourceCurrency"
            className="is-size-5-mobile label-bold"
          >
            Compare
          </label>
        </div>
        <Select
          id="selectSourceSymbol"
          options={this.state.symbols}
          defaultValue={this.state.defaultSymbol}
          isDisabled={false}
          className="block select"
          onChange={this.selectSourceSymbol_OnChange}
        />
        <div className="has-text-centered block">
          <label
            htmlFor="destinationCurrency"
            className="is-size-5-mobile label-bold"
          >
            to
          </label>
        </div>
        <Select options={this.state.symbols} className="block select" />
        <div className="column big-card block">
          <div id="mainChart" className="mainChart"></div>
        </div>
        <div className="has-text-centered block">
          <label className="is-size-5-mobile label-bold">
            Recent exchange rates
          </label>
        </div>
        <Currency id={"USD"} symbol={"USD"} currency={"United States Dollar"} />
        <Currency id={"MXN"} symbol={"MXN"} currency={"Mexican Peso"} />
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
        // r: 4,
        show: true,
      },
    });
  }

  selectSourceSymbol_OnChange = (newValue, actionMeta) => {
    this.setState({
      defaultSymbol: newValue,
    });
  };

  getSymbols() {
    var symbols = {
      USD: "United States Dollar",
      AUD: "Australian Dollar",
      CAD: "Canadian Dollar",
      PLN: "Polish Zloty",
      MXN: "Mexican Peso",
    };

    var options = Object.entries(symbols).map(([key, value]) => {
      return { value: key, label: value };
    });

    return options;
  }
}

export default EchangeRate;
