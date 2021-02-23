import React, {Component} from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Token from "./components/token/Token";
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import {useParams} from "react-router";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/your-tokens">Your tokens</Link>
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route exact path="/">
                            <Dashboard/>
                        </Route>
                        <Route path="/token/:id">
                            <TokenRoute/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

function TokenRoute() {
    const id = useParams().id;
    return <Token id={id}/>
}

export default App;
