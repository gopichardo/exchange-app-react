import "./assets/css/App.css";
import Header from "./components/Header";
import EchangeRate from "./components/ExchangeRate";

function App() {
  return (
    <div className="columns">
      <div className="column">
        <Header />
        <EchangeRate />
      </div>
    </div>
  );
}

export default App;
