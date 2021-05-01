import Signin from "./Signin.js";
import Pay from "./Pay.js";
import NotFound from "./NotFound";
import "../styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/pay" component={Pay} />
          <Route exact path="/notFound" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
