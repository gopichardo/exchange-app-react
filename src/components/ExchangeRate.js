import React, { Component } from "react";
import Select from "react-select";
import c3 from "c3";

import Moment from "moment";
import { extendMoment } from "moment-range";
import "../assets/css/ExchangeRate.css";
import "../assets/css/c3.min.css";
import Currency from "../components/Currency";
import HistoryRate from "../logic/HistoryRate";

const moment = extendMoment(Moment);
class EchangeRate extends Component {
  constructor(props) {
    super(props);
    this.options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
    ];

    this.state = {
      dataReady: false,
      symbolComparisson: "",
      symbols: this.getSymbols(),
      sourceSymbol: { value: "MXN", label: "Mexican Peso" },
      targetSymbol: { value: "USD", label: "United States Dollar" },
      daysRange: this.getDaysRange(),
    };
  }

  render() {
    return (
      <div className="column">
        <h1 className="title is-size-4-mobile">
          Summary of <b>{this.state.sourceSymbol.label}</b> exchange rates
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
          defaultValue={this.state.sourceSymbol}
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
        <Select
          id="selectSymbolToCompare"
          options={this.state.symbols}
          defaultValue={this.state.targetSymbol}
          className="block select"
          onChange={this.selectSymbolToCompare_OnChange}
        />
        <div className="column big-card block is-narrow-mobile">
          <p className="is-size-4-mobile has-text-weight-bold has-text-centered">
            {this.state.symbolComparisson}
          </p>

          <div id="mainChart" className="mainChart"></div>
        </div>
        <div className="has-text-centered block">
          <label className="is-size-5-mobile label-bold">
            Recent exchange rates
          </label>
        </div>
        <div className="columns">
          {this.state.symbols.map((currency, i) => {
            return (
              <div key={"col_" + i} className="column">
                <Currency
                  id={"currency_" + currency.value}
                  key={i}
                  symbol={currency.value}
                  currency={currency.label}
                  targetSymbol={this.state.sourceSymbol.value}
                  className="small-card"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.bindChart();
  }

  bindChart = async () => {
    await HistoryRate.getRateHistoryByDay(this.state.daysRange);
    this.setState(
      {
        symbolComparisson:
          1 +
          " " +
          this.state.sourceSymbol.value +
          " = " +
          this.getTodayRate() +
          " " +
          this.state.targetSymbol.value,
      },
      () => {
        this.generateChart();
      }
    );
  };

  generateChart() {
    c3.generate({
      bindto: "#mainChart",
      data: {
        json: this.getOrderedHistoryRate(),
        keys: {
          x: "date",
          value: ["rate"],
        },
        type: "spline",
      },
      legend: {
        hide: true,
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: function (x) {
              return moment(x).format("DD MMM");
              // return moment(x).format("YYYY-MM-DD");
            },
          },
        },
      },
      point: {
        show: true,
      },
    });
  }

  selectSourceSymbol_OnChange = (newValue, actionMeta) => {
    this.setState(
      {
        sourceSymbol: newValue,
      },
      () => {
        this.bindChart();
      }
    );
  };

  selectSymbolToCompare_OnChange = (newValue, actionMeta) => {
    this.setState(
      {
        targetSymbol: newValue,
      },
      () => {
        this.bindChart();
      }
    );
  };

  getSymbols = () => {
    var symbols = {
      USD: "United States Dollar",
      AUD: "Australian Dollar",
      CAD: "Canadian Dollar",
      PLN: "Polish Zloty",
      MXN: "Mexican Peso",
      EUR: "Euro",
    };

    var options = Object.entries(symbols).map(([key, value]) => {
      return { value: key, label: value };
    });

    return options;
  };

  /**
   * Get Days Range from last 6 days
   * @returns
   */
  getDaysRange = () => {
    let days = [];
    let range = moment.rangeFromInterval("day", -6);

    for (let day of range.by("day")) {
      days.push(day);
    }

    return days;
  };

 

  validateTodayInLocalStorageHistoryRate(today) {
    return false;
  }

  getOrderedHistoryRate() {
    return HistoryRate.transformHistoryRate(
      this.state.sourceSymbol.value,
      this.state.targetSymbol.value
    );
  }

  getTodayRate = () => {
    let todayRate = this.getOrderedHistoryRate().find(
      (rate) => rate.date === moment(new Date()).format("YYYY-MM-DD")
    ).rate;

    return todayRate;
  };
}

export default EchangeRate;
