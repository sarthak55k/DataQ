import './App.css';
import {Competition} from './components/Competition';
import Login from './components/Login';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CompInd from './components/CompInd';
import Leaderboard from './components/Leaderboard';
import {Redirect} from 'react-router';

function App() {


    const Page404 = ({location}) => (
        <div>
            <h2>No match found for <code>{location.pathname}</code></h2>
        </div>
    );


    return (
        <Router>
            <div className="App">
                <Switch>
                <Route path="/" component={Login} exact/>
                <Route path="/competition" component={Competition} exact/>
                <Route path="/competition/:compId" component={CompInd} />
                <Route path="/leaderboadfinal" component={Leaderboard} />
                <Route path ="/404" component={Page404} />
                <Redirect from='*' to='/404' />
                </Switch>{" "}
            </div>
            {" "}
        </Router>
    );
}

export default App;
