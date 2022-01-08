import moment from "moment";
import axios from "axios";
const baseUrl = "http://data.fixer.io/api/";
const fixerKey = "40b5de4e591999345ab08947cac7113f";

const HistoryRate = {
  /**
   * Return Ordered Data
   * @param {*} historyRate History rate
   * @param {*} rateBase Rate Base
   * @param {*} compareRate Rate yto compare
   * @returns Ordered Data
   */
  transformHistoryRate: (rateBase = "MXN", compareRate = "USD") => {
    let data = HistoryRate.getHistoryFromLocalStorage().map((value) => {
      let rateBaseValue = value.rates[rateBase];
      let history = {
        date: value.date,
        currencyBase: rateBase,
        currecyToCompare: compareRate,
        rate: Object.entries(value.rates)
          .filter((filter) => filter[0] === compareRate)
          .map(([rate, rateValue]) => {
            return {
              rate: rate,
              value: parseFloat((rateBaseValue / rateValue).toFixed(2)),
            };
          })
          .find((rate) => rate.rate === compareRate).value,
      };

      return history;
    });

    return data;
  },
  getHistoryFromLocalStorage: () => {
    return JSON.parse(localStorage.getItem("historyRate"));
  },

  getRateHistoryByDay: async (days) => {
    let rateHistory = [];

    let historical = HistoryRate.getHistoryFromLocalStorage();

    if ((historical === null) | undefined) {
      await Promise.all(
        days.map(async (day) => {
          await HistoryRate.getHistoricalrates(moment(day).format("YYYY-MM-DD"))
            .then((response) => {
              if (response.data.success) {
                rateHistory.push(response.data);
              }
            })
            .catch((error) => console.log(error));
        })
      );

      HistoryRate.saveHistoryOnLocalStorage(JSON.stringify(rateHistory));
    }
  },
  saveHistoryOnLocalStorage: (history) => {
    localStorage.setItem("historyRate", history);
  },

  /**
   * Get data from API
   * @param {*} day
   * @returns
   */
  getHistoricalrates: (day) => {
    return axios.get(baseUrl + day, {
      params: {
        access_key: fixerKey,
        symbols: "USD,AUD,CAD,PLN,MXN,EUR",
      },
    });
  },

  getDaysRange: () => {
    let days = [];
    let range = moment.rangeFromInterval("day", -6);

    for (let day of range.by("day")) {
      days.push(day);
    }

    return days;
  },
};

export default HistoryRate;
