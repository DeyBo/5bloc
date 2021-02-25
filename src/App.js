import React, {Component} from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Token from "./components/token/Token";
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import {useLocation, useParams} from "react-router";
import {EthService} from "./services/EthService";
import UserTokens from "./components/user-tokens/UserTokens";
import CreateToken from "./components/create-token/CreateToken";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Navbar, NavbarBrand} from "react-bootstrap";

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
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href='/'>Dashboard</Navbar.Brand>
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Nav.Link href="/your-tokens">Your tokens</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <div className="container">
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
                        <Route path="/token/:id/edit">
                            <TokenRoute/>
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
    if (edit) {
        return <CreateToken id={id} edit={edit}/>
    }
    return <Token id={id} edit={edit}/>
}

export default App;
