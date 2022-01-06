import "./assets/css/App.css";
import Header from "./components/Header";
import EchangeRate from "./components/ExchangeRate";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="columns">
      <div className="column">
        <Header />
        <EchangeRate />
        <Footer />
      </div>
    </div>
  );
}

export default App;
