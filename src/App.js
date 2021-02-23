import React, {Component} from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Token from "./components/token/Token";
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import {useLocation, useParams} from "react-router";

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
                        {/*<Route path="/token/:id/edit">*/}
                        {/*    <TokenRoute/>*/}
                        {/*</Route>*/}
                    </Switch>
                </div>
            </Router>
        )
    }
}

function TokenRoute(props) {
    const id = useParams().id;
    const edit = useLocation().pathname.endsWith('edit');
    return <Token id={id} edit={edit}/>
}

export default App;
