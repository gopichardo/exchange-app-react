import React, { Component } from "react";
import Select from "react-select";
import c3 from "c3";
import axios from "axios";
import Moment from "moment";
import { extendMoment } from "moment-range";
import "../assets/css/ExchangeRate.css";
import "../assets/css/c3.min.css";
import Currency from "../components/Currency";
import HistoryRate from "../logic/HistoryRate";

const moment = extendMoment(Moment);
const baseUrl = "http://data.fixer.io/api/";
const fixerKey = "40b5de4e591999345ab08947cac7113f";

class EchangeRate extends Component {
  state = {
    symbols: this.getSymbols(),
    sourceSymbol: { value: "MXN", label: "Mexican Peso" },
    targetSymbol: { value: "USD", label: "United States Dollar" },
    daysRange: this.getDaysRange(),
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
          className="block select"
          onChange={this.selectSymbolToCompare_OnChange}
        />
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
    this.getRateHistoryByDay();
    this.generateChart();
  }

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
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: function (x) {
              return moment(x).format("YYYY-MM-DD");
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
    this.setState({
      sourceSymbol: newValue,
    });
  };

  selectSymbolToCompare_OnChange = (newValue, actionMeta) => {
    this.setState({
      targetSymbol: newValue,
    });
  };

  getSymbols() {
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
  }

  /**
   * Get data from API
   * @param {*} day
   * @returns
   */
  getHistoricalrates(day) {
    return axios.get(baseUrl + day, {
      params: {
        access_key: fixerKey,
        symbols: "USD,AUD,CAD,PLN,MXN",
      },
    });
  }

  /**
   * Get Days Range from last 6 days
   * @returns
   */
  getDaysRange() {
    let days = [];
    let range = moment.rangeFromInterval("day", -6);

    for (let day of range.by("day")) {
      days.push(day);
    }

    return days;
  }

  /**
   * Get Rate History from the last 7 days
   */
  async getRateHistoryByDay() {
    let days = this.state.daysRange;
    let rateHistory = [];

    let historical = this.getHistoryFromLocalStorage();

    if ((historical === null) | undefined) {
      await Promise.all(
        days.map(async (day) => {
          await this.getHistoricalrates(moment(day).format("YYYY-MM-DD"))
            .then((response) => {
              if (response.data.success) {
                rateHistory.push(response.data);
              }
            })
            .catch((error) => console.log(error));
        })
      );

      this.saveHistoryOnLocalStorage(JSON.stringify(rateHistory));
    }
  }

  saveHistoryOnLocalStorage(history) {
    localStorage.setItem("historyRate", history);
  }

  getHistoryFromLocalStorage() {
    return JSON.parse(localStorage.getItem("historyRate"));
  }

  validateTodayInLocalStorageHistoryRate(today) {
    return false;
  }

  getOrderedHistoryRate() {
    return HistoryRate.transformHistoryRate(
      this.getHistoryFromLocalStorage(),
      this.state.sourceSymbol.value,
      this.state.targetSymbol.value
    );
  }
}

export default EchangeRate;
