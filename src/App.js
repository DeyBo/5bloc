import React, {Component} from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Token from "./components/token/Token";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {useLocation, useParams} from "react-router";
import {EthService} from "./services/EthService";
import UserTokens from "./components/user-tokens/UserTokens";
import CreateToken from "./components/create-token/CreateToken";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Nav, Navbar} from "react-bootstrap";
import {CONTRACT_ADDRESS} from "./config";

class App extends Component {

    constructor(props) {
        super(props);
        this.ethService = new EthService();
        this.state = {contractOwner: false};

        this.withdrawCommission = this.withdrawCommission.bind(this);
        this.changeCommissionPart = this.changeCommissionPart.bind(this);
    }

    componentDidMount() {
        this.ethService.enableEthConnection().then(() => {
            this.ethService.isContractOwner().then((isContractOwner) => {
                this.setState({contractOwner: isContractOwner});
            })
        })
    }

    withdrawCommission() {
        if (this.ethService.contract && this.state.contractOwner) {
            this.ethService.contract.methods.withdrawComissionPart().send({
                from: this.ethService.account,
                value: 1
            });
        }
    }

    changeCommissionPart() {
        if (this.ethService.contract && this.state.contractOwner) {
            const commissionPart = prompt('Please enter the commission part to set');
            if (commissionPart) {
                this.ethService.contract.methods.changeCommissionPart(
                    commissionPart
                ).send({
                    from: this.ethService.account
                });
            }
        }
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
                    {
                        this.state.contractOwner ?
                            <Navbar.Collapse className="justify-content-end">
                                <Button className="btn-light" onClick={this.withdrawCommission}>Withdraw commission</Button>
                                <Button className="btn-light ml-1" onClick={this.changeCommissionPart}>Change commission part</Button>
                            </Navbar.Collapse> : null
                    }
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

                <footer>
                    <span>
                        Distributed app realised in React and using a Solidity smart contract on Ethereum
                        The smart contract is available <a href={'https://rinkeby.etherscan.io/address/' + CONTRACT_ADDRESS}>here</a>.
                    </span>
                </footer>
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
