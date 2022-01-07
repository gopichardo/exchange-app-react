const HistoryRate = {
  /**
   * Return Ordered Data
   * @param {*} historyRate History rate
   * @param {*} rateBase Rate Base
   * @param {*} compareRate Rate yto compare
   * @returns Ordered Data
   */
  transformHistoryRate: (
    historyRate,
    rateBase = "MXN",
    compareRate = "USD"
  ) => {
    let data = historyRate.map((value) => {
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
};

export default HistoryRate;
