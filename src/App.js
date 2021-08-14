import "./styles.css";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route
          exact
          path="/stock/:symbol?"
          render={(props) => <Detail {...props} />}
        />
        <Route path="*" render={(props) => <NotFound {...props} />} />
      </Switch>
    </div>
  );
}
