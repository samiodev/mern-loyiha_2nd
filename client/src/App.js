import { useEffect, createContext, useReducer, useContext } from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./App.css";
import Home from "./components/screens/Home";
import SignIn from "./components/screens/SignIn";
import Profile from "./components/screens/Profile";
import CreatePost from "./components/screens/CreatePost";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      history.push("/");
    } else {
      history.push("/signin");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/profile" component={Profile} />
      <Route path="/createpost" component={CreatePost} />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
