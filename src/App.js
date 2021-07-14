import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home_page";
import ResultPage from "./pages/result_page";
import NotFound from "./pages/404";
import SeatResult from "./pages/seat_result";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/result" exact component={ResultPage} />
        <Route path="/result/:seat" exact component={SeatResult} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
