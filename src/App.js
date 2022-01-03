import "./assets/css/App.css";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <h1 className="title">
        Summary of <b>Mexican Peso</b> exchange rates against other currencies.
      </h1>
      <label for="sourceCurrency">Compare</label>
      <select id="sourceCurrency" name="sourceCurrency">
        <option value="MXN">Peso Mexicano - MXN</option>
      </select>
      <label for="destinationCurrency">to</label>
      <select id="sourceCurrency" name="sourceCurrency">
        <option value="USD">United States Dollar - USD</option>
      </select>
    </div>
  );
}

export default App;
