import HistoryRate from "../logic/HistoryRate";

test("sum 2 plus 2 equals 4", () => {
  //Arrange
  //Act
  let sum = 2 + 2;

  //Assert
  expect(sum).toBe(4);
});

test("transformHistoryRate", () => {
  let historyRate = [
    {
      success: true,
      timestamp: 1641513599,
      historical: true,
      base: "EUR",
      date: "2022-01-06",
      rates: {
        USD: 1.129692,
        AUD: 1.577029,
        CAD: 1.437815,
        PLN: 4.555165,
        MXN: 23.165569,
      },
    },
    {
      success: true,
      timestamp: 1641081599,
      historical: true,
      base: "EUR",
      date: "2022-01-01",
      rates: {
        USD: 1.137145,
        AUD: 1.564485,
        CAD: 1.437255,
        PLN: 4.588727,
        MXN: 23.308415,
      },
    },
    {
      success: true,
      timestamp: 1641427199,
      historical: true,
      base: "EUR",
      date: "2022-01-05",
      rates: {
        USD: 1.131346,
        AUD: 1.566636,
        CAD: 1.443541,
        PLN: 4.573916,
        MXN: 23.279348,
      },
    },
    {
      success: true,
      timestamp: 1641254399,
      historical: true,
      base: "EUR",
      date: "2022-01-03",
      rates: {
        USD: 1.129982,
        AUD: 1.570112,
        CAD: 1.440868,
        PLN: 4.576336,
        MXN: 23.162028,
      },
    },
    {
      success: true,
      timestamp: 1641167999,
      historical: true,
      base: "EUR",
      date: "2022-01-02",
      rates: {
        USD: 1.137288,
        AUD: 1.565111,
        CAD: 1.439391,
        PLN: 4.590381,
        MXN: 23.30371,
      },
    },
    {
      success: true,
      timestamp: 1641340799,
      historical: true,
      base: "EUR",
      date: "2022-01-04",
      rates: {
        USD: 1.128343,
        AUD: 1.558361,
        CAD: 1.433481,
        PLN: 4.564544,
        MXN: 23.172338,
      },
    },
    {
      success: true,
      timestamp: 1641576064,
      historical: true,
      base: "EUR",
      date: "2022-01-07",
      rates: {
        USD: 1.135776,
        AUD: 1.582341,
        CAD: 1.436962,
        PLN: 4.545946,
        MXN: 23.168316,
      },
    },
  ];

  let data = HistoryRate.transformHistoryRate(historyRate, "MXN", "USD");

  expect(data.lenght).toBeGreaterThan(0);
});

// test("Filter hitory", () => {
//   let historyRate = [
//     {
//       success: true,
//       timestamp: 1641513599,
//       historical: true,
//       base: "EUR",
//       date: "2022-01-06",
//       rates: {
//         USD: 1.129692,
//         AUD: 1.577029,
//         CAD: 1.437815,
//         PLN: 4.555165,
//         MXN: 23.165569,
//       },
//     },
//     {
//       success: true,
//       timestamp: 1641081599,
//       historical: true,
//       base: "EUR",
//       date: "2022-01-01",
//       rates: {
//         USD: 1.137145,
//         AUD: 1.564485,
//         CAD: 1.437255,
//         PLN: 4.588727,
//         MXN: 23.308415,
//       },
//     },
//     {
//       success: true,
//       timestamp: 1641427199,
//       historical: true,
//       base: "EUR",
//       date: "2022-01-05",
//       rates: {
//         USD: 1.131346,
//         AUD: 1.566636,
//         CAD: 1.443541,
//         PLN: 4.573916,
//         MXN: 23.279348,
//       },
//     },
//     {
//       success: true,
//       timestamp: 1641254399,
//       historical: true,
//       base: "EUR",
//       date: "2022-01-03",
//       rates: {
//         USD: 1.129982,
//         AUD: 1.570112,
//         CAD: 1.440868,
//         PLN: 4.576336,
//         MXN: 23.162028,
//       },
//     },
//     {
//       success: true,
//       timestamp: 1641167999,
//       historical: true,
//       base: "EUR",
//       date: "2022-01-02",
//       rates: {
//         USD: 1.137288,
//         AUD: 1.565111,
//         CAD: 1.439391,
//         PLN: 4.590381,
//         MXN: 23.30371,
//       },
//     },
//     {
//       success: true,
//       timestamp: 1641340799,
//       historical: true,
//       base: "EUR",
//       date: "2022-01-04",
//       rates: {
//         USD: 1.128343,
//         AUD: 1.558361,
//         CAD: 1.433481,
//         PLN: 4.564544,
//         MXN: 23.172338,
//       },
//     },
//     {
//       success: true,
//       timestamp: 1641576064,
//       historical: true,
//       base: "EUR",
//       date: "2022-01-07",
//       rates: {
//         USD: 1.135776,
//         AUD: 1.582341,
//         CAD: 1.436962,
//         PLN: 4.545946,
//         MXN: 23.168316,
//       },
//     },
//   ];

//   let rateBase = "MXN";
//   let compareRate = "USD";

//   let data = historyRate.map((value) => {
//     let rateBaseValue = value.rates[rateBase];
//     let history = {
//       date: value.date,
//       currencyBase: rateBase,
//       currecyToCompare: compareRate,
//       rate: Object.entries(value.rates)
//         .filter((filter) => filter[0] === compareRate)
//         .map(([rate, rateValue]) => {
//           return {
//             rate: rate,
//             value: rateBaseValue / rateValue,
//           };
//         })
//         .find((rate) => rate.rate === compareRate).value,
//     };

//     return history;
//   });

//   console.log(data);
// });
