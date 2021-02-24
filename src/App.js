import React, {Component} from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Token from "./components/token/Token";
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import {useLocation, useParams} from "react-router";
import {EthService} from "./services/EthService";
import UserTokens from "./components/user-tokens/UserTokens";
import CreateToken from "./components/create-token/CreateToken";

class App extends Component {

    constructor(props) {
        super(props);
        this.ethService = new EthService();
        this.state = {contractOwner: false};
    }

    componentDidMount() {
        this.ethService.enableEthConnection().then(() => {
            this.ethService.isContractOwner().then((isContractOwner) => {
                this.setState({contractOwner: isContractOwner});
            })
        })
    }

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
                            {this.state.contractOwner ? <li>
                                <Link to="/admin">Admin</Link>
                            </li> : null}
                        </ul>
                    </nav>

                    <Switch>
                        <Route exact path="/">
                            <Dashboard/>
                        </Route>
                        <Route path="/your-tokens">
                            <UserTokens/>
                        </Route>
                        <Route path="/token/create">
                            <CreateToken/>
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
    const edit = useLocation().pathname.endsWith('edit');
    return <Token id={id} edit={edit}/>
}

export default App;
