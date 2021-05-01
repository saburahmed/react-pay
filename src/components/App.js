import "../styles/App.css";
import Signin from "./Signin.js";
import Pay from "./Pay.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/pay" component={Pay} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
